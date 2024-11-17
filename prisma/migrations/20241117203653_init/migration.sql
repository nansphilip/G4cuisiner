-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` BOOLEAN NOT NULL,
    `image` VARCHAR(191) NULL,
    `role` ENUM('USER', 'MODO', 'ADMIN') NOT NULL DEFAULT 'USER',
    `restricted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_id_key`(`id`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `session_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` VARCHAR(191) NOT NULL,
    `providerId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NULL,
    `refreshToken` VARCHAR(191) NULL,
    `idToken` VARCHAR(191) NULL,
    `expiresAt` DATETIME(3) NULL,
    `password` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `account_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Ingredient_id_key`(`id`),
    UNIQUE INDEX `Ingredient_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `numberOfServing` INTEGER NOT NULL,
    `preparationTime` INTEGER NOT NULL,
    `difficultyLevel` ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL DEFAULT 'MEDIUM',
    `lunchType` ENUM('BREAKFAST', 'LUNCH', 'BRUNCH', 'DINNER', 'SNACK') NOT NULL,
    `lunchStep` ENUM('APPETIZER', 'STARTER', 'MAIN', 'DESSERT') NOT NULL,
    `instructions` LONGTEXT NOT NULL,
    `status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Recipe_id_key`(`id`),
    UNIQUE INDEX `Recipe_title_key`(`title`),
    UNIQUE INDEX `Recipe_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `url` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Image_url_key`(`url`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorite` (
    `id` VARCHAR(191) NOT NULL,
    `favorite` BOOLEAN NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Favorite_id_key`(`id`),
    UNIQUE INDEX `Favorite_userId_recipeId_key`(`userId`, `recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` VARCHAR(191) NOT NULL,
    `review` LONGTEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Review_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rating` (
    `id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Rating_id_key`(`id`),
    UNIQUE INDEX `Rating_userId_recipeId_key`(`userId`, `recipeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quantity` (
    `id` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` ENUM('GRAM', 'KILOGRAM', 'LITER', 'CENTILITER', 'MILLILITER', 'PIECE') NOT NULL,
    `recipeId` VARCHAR(191) NOT NULL,
    `ingredientId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Quantity_id_key`(`id`),
    UNIQUE INDEX `Quantity_recipeId_ingredientId_key`(`recipeId`, `ingredientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ThumbsPositive` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ThumbsPositive_AB_unique`(`A`, `B`),
    INDEX `_ThumbsPositive_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ThumbsNegative` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ThumbsNegative_AB_unique`(`A`, `B`),
    INDEX `_ThumbsNegative_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorite` ADD CONSTRAINT `Favorite_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quantity` ADD CONSTRAINT `Quantity_recipeId_fkey` FOREIGN KEY (`recipeId`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Quantity` ADD CONSTRAINT `Quantity_ingredientId_fkey` FOREIGN KEY (`ingredientId`) REFERENCES `Ingredient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ThumbsPositive` ADD CONSTRAINT `_ThumbsPositive_A_fkey` FOREIGN KEY (`A`) REFERENCES `Review`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ThumbsPositive` ADD CONSTRAINT `_ThumbsPositive_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ThumbsNegative` ADD CONSTRAINT `_ThumbsNegative_A_fkey` FOREIGN KEY (`A`) REFERENCES `Review`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ThumbsNegative` ADD CONSTRAINT `_ThumbsNegative_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
