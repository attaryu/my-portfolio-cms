/*
  Warnings:

  - You are about to drop the `description_images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "description_images";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "social_media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    CONSTRAINT "social_media_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "social_media_name_key" ON "social_media"("name");

-- CreateIndex
CREATE UNIQUE INDEX "social_media_url_key" ON "social_media"("url");
