ALTER TABLE `sessions` ADD `id` text PRIMARY KEY NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_sessionToken_unique` ON `sessions` (`sessionToken`);