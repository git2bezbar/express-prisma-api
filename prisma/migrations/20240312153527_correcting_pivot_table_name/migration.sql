/*
  Warnings:

  - You are about to drop the `artistsongenre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `artistsongenre` DROP FOREIGN KEY `ArtistsOnGenre_artistsId_fkey`;

-- DropForeignKey
ALTER TABLE `artistsongenre` DROP FOREIGN KEY `ArtistsOnGenre_genreId_fkey`;

-- DropTable
DROP TABLE `artistsongenre`;

-- CreateTable
CREATE TABLE `ArtistsOnGenres` (
    `artistsId` INTEGER NOT NULL,
    `genreId` INTEGER NOT NULL,

    PRIMARY KEY (`artistsId`, `genreId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB;

-- AddForeignKey
ALTER TABLE `ArtistsOnGenres` ADD CONSTRAINT `ArtistsOnGenres_artistsId_fkey` FOREIGN KEY (`artistsId`) REFERENCES `Artist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArtistsOnGenres` ADD CONSTRAINT `ArtistsOnGenres_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
