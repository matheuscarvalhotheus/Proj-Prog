-- CreateTable
CREATE TABLE "gamemode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "hearts" (
    "modeId" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    CONSTRAINT "hearts_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "gamemode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "difficulty" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "game" (
    "modeId" INTEGER NOT NULL,
    "difficultyId" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "game_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "gamemode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_difficultyId_fkey" FOREIGN KEY ("difficultyId") REFERENCES "difficulty" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "gameSettings" (
    "gameId" INTEGER NOT NULL,
    "miniId" INTEGER NOT NULL,
    "tries" INTEGER NOT NULL,
    CONSTRAINT "gameSettings_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "gameSettings_miniId_fkey" FOREIGN KEY ("miniId") REFERENCES "minigame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "minigame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "border" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "solutions" (
    "miniId" INTEGER NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "answer" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    CONSTRAINT "solutions_miniId_fkey" FOREIGN KEY ("miniId") REFERENCES "minigame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "email" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "user_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "userType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "userType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "player" (
    "userEmail" TEXT NOT NULL,
    "miniId" INTEGER NOT NULL,

    PRIMARY KEY ("userEmail", "miniId"),
    CONSTRAINT "player_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "user" ("email") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "player_miniId_fkey" FOREIGN KEY ("miniId") REFERENCES "minigame" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "playerData" (
    "userEmail" TEXT NOT NULL,
    "miniId" INTEGER NOT NULL,
    "modeId" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,

    PRIMARY KEY ("userEmail", "miniId", "modeId"),
    CONSTRAINT "playerData_userEmail_miniId_fkey" FOREIGN KEY ("userEmail", "miniId") REFERENCES "player" ("userEmail", "miniId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "playerData_modeId_fkey" FOREIGN KEY ("modeId") REFERENCES "gamemode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "hearts_modeId_id_key" ON "hearts"("modeId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "game_modeId_difficultyId_id_key" ON "game"("modeId", "difficultyId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "gameSettings_gameId_miniId_key" ON "gameSettings"("gameId", "miniId");

-- CreateIndex
CREATE UNIQUE INDEX "solutions_miniId_id_key" ON "solutions"("miniId", "id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_typeId_key" ON "user"("email", "typeId");
