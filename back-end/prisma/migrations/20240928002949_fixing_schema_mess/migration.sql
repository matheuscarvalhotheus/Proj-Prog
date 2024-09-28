-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_gameSettings" (
    "gameId" INTEGER NOT NULL,
    "miniId" INTEGER NOT NULL,
    "tries" INTEGER NOT NULL,

    PRIMARY KEY ("gameId", "miniId"),
    CONSTRAINT "gameSettings_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "gameSettings_miniId_fkey" FOREIGN KEY ("miniId") REFERENCES "minigame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_gameSettings" ("gameId", "miniId", "tries") SELECT "gameId", "miniId", "tries" FROM "gameSettings";
DROP TABLE "gameSettings";
ALTER TABLE "new_gameSettings" RENAME TO "gameSettings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
