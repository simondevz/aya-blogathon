/*
  Warnings:

  - Added the required column `lastUpdated` to the `MdContent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MdContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "lastUpdated" DATETIME NOT NULL
);
INSERT INTO "new_MdContent" ("id", "text") SELECT "id", "text" FROM "MdContent";
DROP TABLE "MdContent";
ALTER TABLE "new_MdContent" RENAME TO "MdContent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
