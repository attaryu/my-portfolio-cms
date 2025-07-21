-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Owner" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "refresh_token" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Owner" ("address", "cover_url", "created_at", "email", "id", "password", "refresh_token", "updated_at") SELECT "address", "cover_url", "created_at", "email", "id", "password", "refresh_token", "updated_at" FROM "Owner";
DROP TABLE "Owner";
ALTER TABLE "new_Owner" RENAME TO "Owner";
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");
CREATE UNIQUE INDEX "Owner_refresh_token_key" ON "Owner"("refresh_token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
