ALTER TABLE "users" ADD COLUMN "session_id" varchar(36);--> statement-breakpoint
CREATE UNIQUE INDEX "users_session_id_index" ON "users" USING btree ("session_id");