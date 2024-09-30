/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `minigame` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "minigame_name_key" ON "minigame"("name");
