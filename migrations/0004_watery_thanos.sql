DROP INDEX IF EXISTS `sessions_sessionToken_unique`;--> statement-breakpoint
ALTER TABLE `sessions` DROP COLUMN `sessionToken`;