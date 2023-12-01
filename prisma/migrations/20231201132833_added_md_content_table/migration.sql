/*
  Warnings:

  - You are about to drop the column `md_content` on the `Post` table. All the data in the column will be lost.
  - Added the required column `mdContentId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "MdContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER,
    "imageId" INTEGER NOT NULL,
    "mdContentId" INTEGER NOT NULL,
    CONSTRAINT "Post_mdContentId_fkey" FOREIGN KEY ("mdContentId") REFERENCES "MdContent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("authorId", "createdAt", "id", "imageId", "title") SELECT "authorId", "createdAt", "id", "imageId", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_title_key" ON "Post"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
