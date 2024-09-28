/*
  Warnings:

  - The primary key for the `player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `playerData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `miniId` on the `playerData` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `playerData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[modeId,difficultyId]` on the table `game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `playerData` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "game_modeId_difficultyId_id_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_player" (
    "userEmail" TEXT NOT NULL,
    "miniId" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "player_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "user" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_miniId_fkey" FOREIGN KEY ("miniId") REFERENCES "minigame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_player" ("miniId", "userEmail") SELECT "miniId", "userEmail" FROM "player";
DROP TABLE "player";
ALTER TABLE "new_player" RENAME TO "player";
CREATE UNIQUE INDEX "player_userEmail_miniId_key" ON "player"("userEmail", "miniId");
CREATE TABLE "new_playerData" (
    "playerId" INTEGER NOT NULL,
    "modeId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,

    PRIMARY KEY ("playerId", "modeId"),
    CONSTRAINT "playerData_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "playerData_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "gamemode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_playerData" ("modeId", "points") SELECT "modeId", "points" FROM "playerData";
DROP TABLE "playerData";
ALTER TABLE "new_playerData" RENAME TO "playerData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "game_modeId_difficultyId_key" ON "game"("modeId", "difficultyId");
