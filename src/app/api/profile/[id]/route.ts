import { z } from 'zod';

import { isAPIKeyValid } from '@/lib/api';
import { getUserProfile, updateProfileData } from '@/lib/db/utils';
import { replacer } from '@/lib/utils';

const postSchema = z.object({
  data: z.object({
    ephemeral: z.boolean().optional()
  }),
  metadata: z
    .object({
      discordUserId: z.string(),
      discordChannelId: z.string(),
      discordGuildId: z.string().optional()
    })
    .optional()
});

async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isAPIKeyValid(request)) {
    return new Response(JSON.stringify({ code: 'UNAUTHORIZED_REQUEST' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { id } = await params;

  try {
    const data = await getUserProfile({
      discordUserId: BigInt(id)
    });

    return new Response(JSON.stringify(data, replacer));
  } catch (error: any) {
    console.error(error.stack);
    return new Response(JSON.stringify({ code: 'GENERAL_FETCH_FAIL' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
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

  const { id } = await params;

  const response = postSchema.safeParse(await request.json());

  if (!response.success) {
    const { issues } = response.error;

    return new Response(
      JSON.stringify({
        error: { message: 'Invalid request', errors: issues }
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const { data, metadata } = response.data;

    const [profile] = await updateProfileData({
      profile: { discordUserId: BigInt(id) },
      data
    });

    return new Response(JSON.stringify(profile, replacer), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error(error.stack);
    return new Response(JSON.stringify({ code: 'GENERAL_FETCH_FAIL' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export { GET, POST };
