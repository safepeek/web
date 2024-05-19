import { fetchUrlData, validateUrl } from '@/lib/fetch';
import { isAPIKeyValid } from '@/lib/api';
import { createFromAnalyzedUrlData } from '@/lib/db/utils';

type AnalyzedUrlPostData =
  | {
      url: string;
      validate: true;
    }
  | {
      url: string;
      metadata: {
        discordUserId: string;
        discordChannelId: string;
        discordGuildId?: string;
      };
      validate?: false;
    };

const API_KEY = process.env.API_KEY;

export async function POST(request: Request) {
  if (!isAPIKeyValid(request)) {
    return new Response(JSON.stringify({ code: 'UNAUTHORIZED_REQUEST' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (request.headers.get('Content-Type') !== 'application/json') {
    return new Response(JSON.stringify({ code: 'UNSUPPORTED_CONTENT_TYPE' }), {
      status: 415,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const res = (await request.json()) as AnalyzedUrlPostData;

    if (!res.url) {
      return new Response(JSON.stringify({ code: 'URL_REQUIRED' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const validUrl = await validateUrl(res.url);
    if (!validUrl) {
      const errorData = { code: 'INVALID_URL', url: res.url };
      return new Response(JSON.stringify(errorData), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await fetchUrlData(res.url);
    if (res.validate)
      return new Response(
        JSON.stringify({
          code: 'URL_VALID',
          sourceUrl: data.sourceUrl,
          destinationUrl: data.destinationUrl
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    const result = await createFromAnalyzedUrlData({
      analyzedUrlData: {
        userId: BigInt(res.metadata.discordUserId),
        channelId: BigInt(res.metadata.discordChannelId),
        guildId: res.metadata.discordGuildId ? BigInt(res.metadata.discordGuildId) : null,
        urls: [
          {
            rawUrl: data.sourceUrl
          },
          ...data.redirects
        ]
      }
    });

    return new Response(
      JSON.stringify({
        data,
        id: result
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error(error.stack);
    return new Response(JSON.stringify({ code: 'GENERAL_FETCH_FAIL' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
