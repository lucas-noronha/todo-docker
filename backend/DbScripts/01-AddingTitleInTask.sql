START TRANSACTION;
ALTER TABLE "ToDo" ADD "Title" text NOT NULL DEFAULT '';

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20250602200903_AddingTitleInTask', '9.0.5');

COMMIT;