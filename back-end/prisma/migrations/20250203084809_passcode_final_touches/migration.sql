-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "auth" BOOLEAN NOT NULL,
    "passcode" TEXT,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "user_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "userType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user" ("Id", "auth", "email", "name", "passcode", "password", "typeId") SELECT "Id", "auth", "email", "name", "passcode", "password", "typeId" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
