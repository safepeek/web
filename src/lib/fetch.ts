import { load } from 'cheerio';
import { AnalysisData, AnalyzedUrlRedirect } from '@safepeek/utils';

type FetcherOpts = {
  follow?: boolean;
  signal?: AbortSignal;
};

const fetcher = (url: string, opts?: FetcherOpts) => {
  return fetch(url, {
    redirect: opts?.follow ? 'follow' : 'manual',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      'Sec-Ch-Ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1'
    },
    signal: opts?.signal
  });
};

export const validateUrl = async (url: string): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetcher(url, {
      signal: controller.signal,
      follow: true
    });

    clearTimeout(timeoutId);

    // Accept any response that isn't a server error (5xx)
    // 4xx responses (like 403) still provide valuable data (destination URL, redirects)
    return response.status < 500;
  } catch (error: any) {
    console.error(`Error validating URL: ${url}`, error.message);
    console.error(error.stack);
    return false;
  }
};

const fetchWithRedirects = async (url: string) => {
  const maxRedirects = 10;
  let currentUrl = url;
  let response: Response;
  let metadata: MetadataResponse;
  const urls: AnalyzedUrlRedirect[] = [];
  let redirectCount = 0;

  try {
    response = await fetcher(currentUrl);
    metadata = await getMetadata(response);
  } catch (error: any) {
    console.error('Initial fetch failed:', error);
    throw new Error('Initial fetch failed: ' + error.message);
  }

  while (response.status >= 300 && response.status < 400) {
    if (++redirectCount > maxRedirects) {
      console.error('Exceeded max redirects');
      throw new Error('Too many redirects');
    }

    const location = response.headers.get('location');
    if (!location) break;

    try {
      currentUrl = new URL(location, response.url).toString();
      response = await fetcher(currentUrl);
      metadata = await getMetadata(response);
    } catch (error: any) {
      console.error(`Error during fetch or metadata retrieval at ${currentUrl}:`, error);
      throw new Error(`Failed at URL ${currentUrl}: ` + error.message);
    }

    urls.push({
      rawUrl: currentUrl,
      meta: metadata
    });
  }

  return urls;
};

type MetadataResponse = {
  title: string;
  description: string;
};

const getMetadata = async (response: Response): Promise<MetadataResponse> => {
  let title: string = '';
  let description: string = '';

  try {
    const html = await response.text();
    const $ = load(html);

    title = $('title').text() ?? '';
    description = $('meta[name="description"]').attr('content') ?? '';
  } catch (e: any) {
    console.error('Failed to retrieve metadata from the following url:', response.url);
    return { title, description }; // if there's an error, just return the default data
  }

  return { title, description };
};

export const fetchUrlData = async (url: string): Promise<AnalysisData> => {
  const response = await fetcher(url, { follow: true });
  const sourceUrl = url;
  const destinationUrl = response.url;
  const redirects = await fetchWithRedirects(sourceUrl);
  const { title, description } = await getMetadata(response);

  return {
    title,
    description,
    sourceUrl,
    destinationUrl,
    redirects
  };
};
