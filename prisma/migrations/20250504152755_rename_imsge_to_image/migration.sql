/*
  Warnings:

  - You are about to drop the column `imsge` on the `Room` table. All the data in the column will be lost.
  - Added the required column `image` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "imsge",
ADD COLUMN     "image" TEXT NOT NULL;
