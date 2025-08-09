-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_owners" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT,
    "cover_url" TEXT,
    "about" TEXT,
    "refresh_token" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_owners" ("address", "cover_url", "created_at", "email", "id", "password", "refresh_token", "updated_at") SELECT "address", "cover_url", "created_at", "email", "id", "password", "refresh_token", "updated_at" FROM "owners";
DROP TABLE "owners";
ALTER TABLE "new_owners" RENAME TO "owners";
CREATE UNIQUE INDEX "owners_email_key" ON "owners"("email");
CREATE UNIQUE INDEX "owners_refresh_token_key" ON "owners"("refresh_token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
