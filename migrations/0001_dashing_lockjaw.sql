DROP INDEX IF EXISTS `user_id_idx`;--> statement-breakpoint
CREATE INDEX `accounts_user_id_idx` ON `accounts` (`userId`);--> statement-breakpoint
CREATE INDEX `post_user_id_idx` ON `posts` (`userId`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `sessions` (`userId`);--> statement-breakpoint
CREATE INDEX `site_user_id_idx` ON `sites` (`userId`);