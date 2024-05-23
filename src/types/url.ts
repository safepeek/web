import { AnalyzedUrlRedirect } from '@safepeek/utils';

export interface UrlAnalysisInputData {
  guildId: bigint | null;
  userId: bigint;
  channelId: bigint;
  urls: AnalyzedUrlRedirect[];
}
