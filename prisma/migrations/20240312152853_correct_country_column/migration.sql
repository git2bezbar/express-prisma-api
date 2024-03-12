/*
  Warnings:

  - You are about to drop the column `coutry` on the `artist` table. All the data in the column will be lost.
  - Added the required column `country` to the `Artist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `artist` DROP COLUMN `coutry`,
    ADD COLUMN `country` VARCHAR(191) NOT NULL;
