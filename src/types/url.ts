export type AnalysisData = {
  title: string;
  description: string;
  sourceUrl: string;
  destinationUrl: string;
  redirects: UrlRedirectData[];
};

export interface UrlAnalysisInputData {
  guildId: bigint | null;
  userId: bigint;
  channelId: bigint;
  urls: UrlRedirectData[];
}

export interface UrlRedirectData {
  rawUrl: string;
  meta?: AnalyzedUrlRedirectMetadata;
}

export interface AnalyzedUrlRedirectMetadata {
  title?: string;
  description?: string;
}
