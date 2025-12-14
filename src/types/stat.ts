import { CommandStatEntry } from '@safepeek/utils';
import { z } from 'zod';

export const statCommandSchema = z.object({
  name: z.string(),
  id: z.string(),
  type: z.number(),
  options: z.record(z.any(), z.unknown()),
  context: z.number(),
  integration_types: z.array(z.number()),
  metadata: z.object({
    user_id: z.string(),
    channel_id: z.string(),
    guild_id: z.string().nullish(),
    locale: z.string().nullish(),
    guild_locale: z.string().nullish(),
    interaction_id: z.string(),
    invoked_at: z.number(),
    bot_version: z.string(),
    last_commit: z.string(),
    environment: z.string()
  })
});

export type CommandStatEntrySchema = z.infer<typeof statCommandSchema>;
export type AssertCommandStatSchemaCompatibility = CommandStatEntrySchema extends CommandStatEntry ? true : never;
