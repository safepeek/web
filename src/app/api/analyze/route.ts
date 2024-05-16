import { fetchUrlData, validateUrl } from '@/lib/fetch';

type AnalyzedUrlPostData = {
  url: string;
  validate?: boolean;
};

// Define your API key
const API_KEY = process.env.API_KEY;

export async function POST(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey || apiKey !== API_KEY) {
    return new Response(JSON.stringify({ code: 'UNAUTHORIZED_REQUEST' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Check if the Content-Type is application/json
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

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ code: 'GENERAL_FETCH_FAIL' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
