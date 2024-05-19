import { ApplicationCommandType, ApplicationIntegrationType, InteractionContextType } from 'discord-api-types/v10';
import { z } from 'zod';

export const statCommandSchema = z.object({
  name: z.string(),
  id: z.string(),
  type: z.number(),
  options: z.record(z.any()),
  context: z.number(),
  integrationTypes: z.array(z.number()),
  metadata: z.object({
    userId: z.string(),
    channelId: z.string(),
    guildId: z.string().nullish(),
    locale: z.string().nullish(),
    guildLocale: z.string().nullish(),
    interactionId: z.string(),
    invokedAt: z.number()
  })
});

export interface CommandStatEntry {
  name: string;
  id: string;
  type: ApplicationCommandType;
  options: { [p: string]: any };
  context: InteractionContextType | null;
  integrationTypes: ApplicationIntegrationType[];
  metadata: CommandStatEntryMetadata;
}

interface CommandStatEntryMetadata {
  userId: string;
  channelId: string;
  guildId: string | null;
  locale: string | null;
  guildLocale: string | null;
  interactionId: string;
  invokedAt: number;
}

export type CommandStatEntrySchema = z.infer<typeof statCommandSchema>;
export type AssertCommandStatSchemaCompatibility = CommandStatEntrySchema extends CommandStatEntry ? true : never;
