import { AnalyzedUrlRedirect } from '@safepeek/utils';

export interface UrlAnalysisInputData {
  guildId: bigint | null;
  userId: bigint | null;
  channelId: bigint | null;
  source: 'discord' | 'web';
  urls: AnalyzedUrlRedirect[];
}
