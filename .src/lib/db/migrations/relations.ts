import { relations } from "drizzle-orm/relations";
import { analyzedUrlRevisions, analyzedUrlResults, analyzedUrls, users, guilds } from "./schema";

export const analyzedUrlResultsRelations = relations(analyzedUrlResults, ({one}) => ({
	analyzedUrlRevision: one(analyzedUrlRevisions, {
		fields: [analyzedUrlResults.analyzedUrlRevisionId],
		references: [analyzedUrlRevisions.id]
	}),
	analyzedUrl: one(analyzedUrls, {
		fields: [analyzedUrlResults.redirectAnalyzedUrlId],
		references: [analyzedUrls.id]
	}),
}));

export const analyzedUrlRevisionsRelations = relations(analyzedUrlRevisions, ({one, many}) => ({
	analyzedUrlResults: many(analyzedUrlResults),
	analyzedUrl: one(analyzedUrls, {
		fields: [analyzedUrlRevisions.analyzedUrlId],
		references: [analyzedUrls.id]
	}),
	user: one(users, {
		fields: [analyzedUrlRevisions.userId],
		references: [users.id]
	}),
	guild: one(guilds, {
		fields: [analyzedUrlRevisions.guildId],
		references: [guilds.id]
	}),
}));

export const analyzedUrlsRelations = relations(analyzedUrls, ({many}) => ({
	analyzedUrlResults: many(analyzedUrlResults),
	analyzedUrlRevisions: many(analyzedUrlRevisions),
}));

export const usersRelations = relations(users, ({many}) => ({
	analyzedUrlRevisions: many(analyzedUrlRevisions),
}));

export const guildsRelations = relations(guilds, ({many}) => ({
	analyzedUrlRevisions: many(analyzedUrlRevisions),
}));