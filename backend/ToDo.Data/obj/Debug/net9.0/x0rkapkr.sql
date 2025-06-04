START TRANSACTION;
ALTER TABLE "ToDo" ADD "Completed" boolean NOT NULL DEFAULT FALSE;

ALTER TABLE "ToDo" ADD "CreatedAd" timestamp with time zone NOT NULL DEFAULT TIMESTAMPTZ '-infinity';

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20250604164030_AddingCompletedInTodo', '9.0.5');

COMMIT;

