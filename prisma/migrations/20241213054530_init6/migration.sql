-- DropIndex
DROP INDEX `Suprimento_categoriaId_fkey` ON `suprimento`;

-- AlterTable
ALTER TABLE `suprimento` MODIFY `descricao` TEXT NULL,
    MODIFY `marca` VARCHAR(15) NULL,
    MODIFY `minqtd` INTEGER NULL;
