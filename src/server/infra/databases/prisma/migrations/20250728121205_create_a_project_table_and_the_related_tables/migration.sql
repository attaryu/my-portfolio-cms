-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "project_techs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "project_id" TEXT NOT NULL,
    "tech_id" TEXT NOT NULL,
    CONSTRAINT "project_techs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "project_techs_tech_id_fkey" FOREIGN KEY ("tech_id") REFERENCES "techs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "main_links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    CONSTRAINT "main_links_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "other_links" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "project_id" TEXT NOT NULL,
    CONSTRAINT "other_links_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "description_images" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    CONSTRAINT "description_images_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "top_projects" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "project_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    CONSTRAINT "top_projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "top_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "project_techs_project_id_tech_id_key" ON "project_techs"("project_id", "tech_id");

-- CreateIndex
CREATE UNIQUE INDEX "main_links_project_id_type_key" ON "main_links"("project_id", "type");

-- CreateIndex
CREATE UNIQUE INDEX "other_links_project_id_title_key" ON "other_links"("project_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "other_links_project_id_order_key" ON "other_links"("project_id", "order");

-- CreateIndex
CREATE UNIQUE INDEX "other_links_project_id_url_key" ON "other_links"("project_id", "url");

-- CreateIndex
CREATE UNIQUE INDEX "description_images_project_id_url_key" ON "description_images"("project_id", "url");
