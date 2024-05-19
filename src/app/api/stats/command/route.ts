import { isAPIKeyValid } from '@/lib/api';
import { statCommandSchema } from '@/types/stat';
import { redis } from '@/lib/redis';

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

  const response = statCommandSchema.safeParse(await request.json());

  if (!response.success) {
    const { errors } = response.error;

    return new Response(
      JSON.stringify({
        error: { message: 'Invalid request', errors }
      }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const commandKey: string = `stats:command:${response.data.id}`;
    await redis.lpush(commandKey, JSON.stringify(response.data));

    return new Response(undefined, {
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
