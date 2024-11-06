import Prisma from "@lib/prisma";
import {
    accountData,
    fruitData,
    ingredientData,
    recipeData,
    recipeIngredientData,
    userData,
    userFavoriteData,
} from "./data";

const main = async () => {
    for (const { id, name, email, emailVerified, image, role } of userData) {
        await Prisma.user.create({
            data: { id, name, email, emailVerified, image, role },
        });
    }

    for (const { id, accountId, providerId, userId, password } of accountData) {
        await Prisma.account.create({
            data: { id, accountId, providerId, userId, password },
        });
    }

    for (const { id, name, description, image } of ingredientData) {
        await Prisma.ingredient.create({
            data: { id, name, description, image },
        });
    }

    for (const {
        id,
        title,
        description,
        image,
        numberOfServing,
        preparationTime,
        difficultyLevel,
        lunchType,
        lunchStep,
        userId,
    } of recipeData) {
        await Prisma.recipe.create({
            data: {
                id,
                title,
                slug: title
                    .toLowerCase()
                    .replace(/œ/g, "oe")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-"),
                description,
                image,
                numberOfServing,
                preparationTime,
                difficultyLevel,
                lunchStep,
                lunchType,
                userId,
            },
        });
    }

    for (const { quantity, unit, recipeId, ingredientId } of recipeIngredientData) {
        await Prisma.recipeIngredient.create({
            data: { quantity, unit, recipeId, ingredientId },
        });
    }

    for (const { userId, Favorite } of userFavoriteData) {
        await Prisma.user.update({
            where: { id: userId },
            data: { Favorite: { connect: Favorite.map((id) => ({ id })) } },
        });
    }
    
    for (const { name, description, image } of fruitData) {
        await Prisma.fruit.create({
            data: { name, description, image },
        });
    }
};

// Execute script
main();
