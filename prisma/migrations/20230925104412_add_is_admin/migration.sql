-- CreateTable
CREATE TABLE `Registration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `is_admin` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Registration_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
