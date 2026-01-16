import { pgTable, index, foreignKey, char, varchar, text, timestamp, uniqueIndex, bigint, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const analyzedUrlResults = pgTable("analyzed_url_results", {
	id: char({ length: 26 }).primaryKey().notNull(),
	analyzedUrlRevisionId: varchar("analyzed_url_revision_id", { length: 26 }).notNull(),
	redirectAnalyzedUrlId: char("redirect_analyzed_url_id", { length: 26 }),
	metaTitle: text("meta_title"),
	metaDescription: text("meta_description"),
	insertedAt: timestamp("inserted_at", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	index().using("btree", table.analyzedUrlRevisionId.asc().nullsLast().op("text_ops")),
	index().using("btree", table.redirectAnalyzedUrlId.asc().nullsLast().op("bpchar_ops")),
	foreignKey({
			columns: [table.analyzedUrlRevisionId],
			foreignColumns: [analyzedUrlRevisions.id],
			name: "analyzed_url_results_analyzed_url_revision_id_analyzed_url_revi"
		}).onUpdate("restrict").onDelete("cascade"),
	foreignKey({
			columns: [table.redirectAnalyzedUrlId],
			foreignColumns: [analyzedUrls.id],
			name: "analyzed_url_results_redirect_analyzed_url_id_analyzed_urls_id_"
		}).onUpdate("restrict").onDelete("cascade"),
]);

export const analyzedUrls = pgTable("analyzed_urls", {
	id: char({ length: 26 }).primaryKey().notNull(),
	domainHash: char("domain_hash", { length: 64 }).notNull(),
	pathHash: char("path_hash", { length: 64 }),
	paramsHash: char("params_hash", { length: 64 }),
}, (table) => [
	index().using("btree", table.domainHash.asc().nullsLast().op("bpchar_ops")),
	uniqueIndex().using("btree", table.domainHash.asc().nullsLast().op("bpchar_ops"), table.pathHash.asc().nullsLast().op("bpchar_ops"), table.paramsHash.asc().nullsLast().op("bpchar_ops")),
]);

export const guilds = pgTable("guilds", {
	id: char({ length: 26 }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	discordId: bigint("discord_id", { mode: "number" }).notNull(),
}, (table) => [
	uniqueIndex().using("btree", table.discordId.asc().nullsLast().op("int8_ops")),
]);

export const analyzedUrlRevisions = pgTable("analyzed_url_revisions", {
	id: char({ length: 26 }).primaryKey().notNull(),
	analyzedUrlId: char("analyzed_url_id", { length: 26 }).notNull(),
	userId: char("user_id", { length: 26 }),
	guildId: char("guild_id", { length: 26 }),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	discordChannelId: bigint("discord_channel_id", { mode: "number" }),
	insertedAt: timestamp("inserted_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	source: varchar({ length: 20 }).default('discord').notNull(),
}, (table) => [
	index().using("btree", table.analyzedUrlId.asc().nullsLast().op("bpchar_ops")),
	index().using("btree", table.guildId.asc().nullsLast().op("bpchar_ops")),
	index().using("btree", table.userId.asc().nullsLast().op("bpchar_ops")),
	foreignKey({
			columns: [table.analyzedUrlId],
			foreignColumns: [analyzedUrls.id],
			name: "analyzed_url_revisions_analyzed_url_id_analyzed_urls_id_fk"
		}).onUpdate("restrict").onDelete("cascade"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "analyzed_url_revisions_user_id_users_id_fk"
		}).onUpdate("restrict").onDelete("cascade"),
	foreignKey({
			columns: [table.guildId],
			foreignColumns: [guilds.id],
			name: "analyzed_url_revisions_guild_id_guilds_id_fk"
		}).onUpdate("restrict").onDelete("cascade"),
]);

export const users = pgTable("users", {
	id: char({ length: 26 }).primaryKey().notNull(),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	discordId: bigint("discord_id", { mode: "number" }),
	ephemeral: boolean().default(true),
}, (table) => [
	uniqueIndex().using("btree", table.discordId.asc().nullsLast().op("int8_ops")),
]);
