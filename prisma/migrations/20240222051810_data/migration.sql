-- CreateTable
CREATE TABLE `Contact` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL DEFAULT '000-000-0000',
    `message` VARCHAR(191) NULL,

    UNIQUE INDEX `Contact_email_key`(`email`),
    UNIQUE INDEX `Contact_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
