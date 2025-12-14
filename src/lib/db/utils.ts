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

async function upsertUser(discordId: bigint, tx: DrizzleClient) {
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
  userId: string,
  guildId: string | null,
  discordChannelId: bigint,
  tx: DrizzleClient
) {
  return takeFirstOrThrow(
    await tx
      .insert(analyzedUrlRevisions)
      .values({
        analyzedUrlId,
        userId,
        guildId,
        discordChannelId
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
    const user = await upsertUser(props.analyzedUrlData.userId, tx);
    const guild = props.analyzedUrlData.guildId ? await upsertGuild(props.analyzedUrlData.guildId, tx) : { id: null };

    let previousRedirectAnalyzedUrlId: string | null = null;
    for (const redirect of props.analyzedUrlData.urls.reverse()) {
      const UrlAnalysisInputData = await upsertAnalyzedUrl(redirect.rawUrl, tx);
      const analyzedUrlRevision = await createAnalyzedUrlRevision(
        UrlAnalysisInputData.id,
        user.id,
        guild.id,
        props.analyzedUrlData.channelId,
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
    return upsertUser(props.discordUserId, tx);
  });
}
