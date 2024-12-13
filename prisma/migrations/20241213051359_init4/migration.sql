/*
  Warnings:

  - Added the required column `descricao` to the `Suprimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marca` to the `Suprimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minqtd` to the `Suprimento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `suprimento` ADD COLUMN `descricao` TEXT NOT NULL,
    ADD COLUMN `marca` VARCHAR(15) NOT NULL,
    ADD COLUMN `minqtd` INTEGER NOT NULL;
