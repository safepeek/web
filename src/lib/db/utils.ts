import { and, eq, isNull } from 'drizzle-orm';
import { createHash } from 'crypto';
import { UrlAnalysisInputData } from '@/types/url';
import { db, DrizzleClient } from './';
import { analyzedUrlResults, analyzedUrlRevisions, analyzedUrls, guilds, users } from './schema';

async function sha256(data: string) {
  return createHash('sha256').update(data).digest('hex');
}

function sha256IfNotEmpty(data: string) {
  const isEmpty = !data.length || data === '/';
  return isEmpty ? null : sha256(data);
}

function takeFirstOrThrow<T>(results: T[]): T {
  const [result] = results;
  if (!result) throw new Error(`Something went wrong with query: no results`);
  return result;
}

type UpsertUserOptions = {
  discordId?: bigint | null;
  sessionId?: string | null;
};

async function upsertUser(options: UpsertUserOptions, tx: DrizzleClient) {
  const { discordId, sessionId } = options;

  // Discord users: upsert by discordId
  if (discordId) {
    const user = await tx.query.users.findFirst({
      where: eq(users.discordId, discordId)
    });

    if (user) return user;

    return takeFirstOrThrow(
      await tx
        .insert(users)
        .values({
          discordId
        })
        .returning()
    );
  }

  // Web users with session: upsert by sessionId
  if (sessionId) {
    const user = await tx.query.users.findFirst({
      where: eq(users.sessionId, sessionId)
    });

    if (user) return user;

    return takeFirstOrThrow(
      await tx
        .insert(users)
        .values({
          sessionId
        })
        .returning()
    );
  }

  // Fallback: create anonymous user without any identifier
  return takeFirstOrThrow(
    await tx
      .insert(users)
      .values({
        discordId: null,
        sessionId: null
      })
      .returning()
  );
}

async function upsertGuild(discordId: bigint, tx: DrizzleClient) {
  const guild = await tx.query.guilds.findFirst({
    where: eq(guilds.discordId, discordId)
  });

  if (guild) return guild;

  return takeFirstOrThrow(
    await tx
      .insert(guilds)
      .values({
        discordId
      })
      .returning()
  );
}

async function upsertAnalyzedUrl(rawUrl: string, tx: DrizzleClient) {
  const url = new URL(rawUrl);
  const domainHash = await sha256(url.host);
  const pathHash = await sha256IfNotEmpty(url.pathname);
  const paramsHash = await sha256IfNotEmpty(url.searchParams.toString());

  const UrlAnalysisInputData = await tx.query.analyzedUrls.findFirst({
    where: and(
      eq(analyzedUrls.domainHash, domainHash),
      pathHash ? eq(analyzedUrls.pathHash, pathHash) : isNull(analyzedUrls.pathHash),
      paramsHash ? eq(analyzedUrls.paramsHash, paramsHash) : isNull(analyzedUrls.paramsHash)
    )
  });

  if (UrlAnalysisInputData) return UrlAnalysisInputData;

  return takeFirstOrThrow(
    await tx
      .insert(analyzedUrls)
      .values({
        domainHash,
        pathHash,
        paramsHash
      })
      .returning()
  );
}

async function createAnalyzedUrlRevision(
  analyzedUrlId: string,
  userId: string | null,
  guildId: string | null,
  discordChannelId: bigint | null,
  source: 'discord' | 'web',
  tx: DrizzleClient
) {
  return takeFirstOrThrow(
    await tx
      .insert(analyzedUrlRevisions)
      .values({
        analyzedUrlId,
        userId,
        guildId,
        discordChannelId,
        source
      })
      .returning()
  );
}

type CreateAnalyzedUrlResultProps = {
  analyzedUrlId: string;
  analyzedUrlRevisionId: string;
  redirectAnalyzedUrlId: string | null;
  metaTitle?: string;
  metaDescription?: string;
  tx: DrizzleClient;
};

async function createAnalyzedUrlResult(props: CreateAnalyzedUrlResultProps) {
  const minInsertTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

  const inserted = await props.tx.query.analyzedUrlRevisions.findFirst({
    where: (revisions, { eq }) => eq(revisions.analyzedUrlId, props.analyzedUrlId),
    with: {
      analyzedUrlResults: {
        where: (results, { gt }) => gt(results.insertedAt, minInsertTime)
      }
    }
  });

  if (!inserted?.analyzedUrlResults.length)
    return takeFirstOrThrow(
      await props.tx
        .insert(analyzedUrlResults)
        .values({
          analyzedUrlRevisionId: props.analyzedUrlRevisionId,
          redirectAnalyzedUrlId: props.redirectAnalyzedUrlId,
          metaTitle: props.metaTitle,
          metaDescription: props.metaDescription
        })
        .returning()
    );

  return inserted;
}

type CreateAnalyzedUrlDataProps = {
  analyzedUrlData: UrlAnalysisInputData;
};

export async function createFromAnalyzedUrlData(props: CreateAnalyzedUrlDataProps) {
  return db.transaction(async (tx) => {
    const user = await upsertUser(
      {
        discordId: props.analyzedUrlData.userId,
        sessionId: props.analyzedUrlData.sessionId
      },
      tx
    );
    const guild = props.analyzedUrlData.guildId ? await upsertGuild(props.analyzedUrlData.guildId, tx) : { id: null };

    let previousRedirectAnalyzedUrlId: string | null = null;
    for (const redirect of props.analyzedUrlData.urls.reverse()) {
      const UrlAnalysisInputData = await upsertAnalyzedUrl(redirect.rawUrl, tx);
      const analyzedUrlRevision = await createAnalyzedUrlRevision(
        UrlAnalysisInputData.id,
        user.id,
        guild.id,
        props.analyzedUrlData.channelId,
        props.analyzedUrlData.source,
        tx
      );
      await createAnalyzedUrlResult({
        analyzedUrlId: UrlAnalysisInputData.id,
        analyzedUrlRevisionId: analyzedUrlRevision.id,
        redirectAnalyzedUrlId: previousRedirectAnalyzedUrlId,
        metaTitle: redirect.meta?.title,
        metaDescription: redirect.meta?.description,
        tx
      });

      previousRedirectAnalyzedUrlId = UrlAnalysisInputData.id;
    }

    return previousRedirectAnalyzedUrlId!;
  });
}

export type UserProfile = {
  discordUserId: bigint;
};

export type UpdateProfileDataProps = {
  profile: UserProfile;
  data: {
    ephemeral?: boolean;
  };
};

export async function updateProfileData(props: UpdateProfileDataProps) {
  return db.update(users).set(props.data).where(eq(users.discordId, props.profile.discordUserId)).returning();
}

type GetUserProfileProps = {
  discordUserId: bigint;
};

export async function getUserProfile(props: GetUserProfileProps) {
  return db.transaction((tx) => {
    return upsertUser({ discordId: props.discordUserId }, tx);
  });
}
