/*
  Warnings:

  - The primary key for the `artistsongenres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `artistsId` on the `artistsongenres` table. All the data in the column will be lost.
  - Added the required column `artistId` to the `ArtistsOnGenres` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `artistsongenres` DROP FOREIGN KEY `ArtistsOnGenres_artistsId_fkey`;

-- AlterTable
ALTER TABLE `artistsongenres` DROP PRIMARY KEY,
    DROP COLUMN `artistsId`,
    ADD COLUMN `artistId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`artistId`, `genreId`);

-- AddForeignKey
ALTER TABLE `ArtistsOnGenres` ADD CONSTRAINT `ArtistsOnGenres_artistId_fkey` FOREIGN KEY (`artistId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
