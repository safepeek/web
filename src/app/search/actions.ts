'use server';

type AnalysisResult = {
  title: string;
  description: string;
  sourceUrl: string;
  finalUrl: string;
  redirects: string[];
  analyzedAt: string;
};

type AnalysisResponse =
  | { success: true; data: AnalysisResult }
  | { success: false; error: string };

export async function analyzeUrl(url: string): Promise<AnalysisResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY || ''
      },
      body: JSON.stringify({
        url,
        source: 'web'
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ code: 'UNKNOWN_ERROR' }));
      return {
        success: false,
        error: errorData.code || 'Failed to analyze URL'
      };
    }

    const { data } = await response.json();

    if (!data) {
      return {
        success: false,
        error: 'Invalid response from server'
      };
    }

    return {
      success: true,
      data: {
        title: data.title || '',
        description: data.description || '',
        sourceUrl: data.sourceUrl || '',
        finalUrl: data.destinationUrl || '',
        redirects: [data.sourceUrl, ...data.redirects.map((r: any) => r.rawUrl)],
        analyzedAt: new Date().toISOString()
      }
    };
  } catch (error: any) {
    console.error('Error analyzing URL:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze URL'
    };
  }
}
