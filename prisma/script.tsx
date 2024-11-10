import Prisma from "@lib/prisma";
import {
    accountData,
    fruitData,
    ingredientData,
    recipeData,
    recipeIngredientData,
    userData,
    recipeUserData,
} from "./data";

export const fixtures = async () => {
    try {
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
            numberOfServing,
            preparationTime,
            difficultyLevel,
            lunchType,
            lunchStep,
            userId,
            imageList,
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
                    numberOfServing,
                    preparationTime,
                    difficultyLevel,
                    lunchStep,
                    lunchType,
                    userId,
                    RecipeImage: {
                        create: imageList.map(({ url, alt }) => ({
                            url,
                            alt,
                        })),
                    },
                },
            });
        }

        for (const { quantity, unit, recipeId, ingredientId } of recipeIngredientData) {
            await Prisma.recipeIngredient.create({
                data: { quantity, unit, recipeId, ingredientId },
            });
        }

        for (const { favorite, rating, review, recipeId, userId } of recipeUserData) {
            await Prisma.recipe.update({
                where: {
                    id: recipeId,
                },
                data: {
                    RecipeUser: {
                        create: {
                            favorite,
                            rating,
                            review,
                            userId,
                        },
                    },
                },
            });
        }

        for (const { name, description, image } of fruitData) {
            await Prisma.fruit.create({
                data: { name, description, image },
            });
        }

        return true;
    } catch (error) {
        console.error("An error occurred ->", error);
        return false;
    }
};

export const reset = async () => {
    try {
        await Prisma.recipeIngredient.deleteMany({});
        await Prisma.recipeUser.deleteMany({});
        await Prisma.recipeImage.deleteMany({});
        await Prisma.session.deleteMany({});
        await Prisma.account.deleteMany({});
        await Prisma.recipe.deleteMany({});
        await Prisma.ingredient.deleteMany({});
        await Prisma.user.deleteMany({});
        await Prisma.fruit.deleteMany({});

        return true;
    } catch (error) {
        console.error("An error occurred ->", error);
        return false;
    }
};