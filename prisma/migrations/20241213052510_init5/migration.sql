/*
  Warnings:

  - You are about to drop the `categoria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `suprimento` DROP FOREIGN KEY `Suprimento_categoriaId_fkey`;

-- AlterTable
ALTER TABLE `suprimento` MODIFY `categoriaId` VARCHAR(30) NOT NULL;

-- DropTable
DROP TABLE `categoria`;
