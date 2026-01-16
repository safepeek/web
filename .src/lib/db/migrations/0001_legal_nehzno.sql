ALTER TABLE "analyzed_url_revisions" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "analyzed_url_revisions" ALTER COLUMN "discord_channel_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "discord_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "analyzed_url_revisions" ADD COLUMN "source" varchar(20) DEFAULT 'discord' NOT NULL;