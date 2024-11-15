import Prisma from "@lib/prisma";
import { accountData, fruitData, ingredientData, recipeData, userData } from "./data";

export const fixtures = async () => {
    try {
        // User table
        for (const { id, name, email, emailVerified, image, role, restricted } of userData) {
            await Prisma.user.create({
                data: { id, name, email, emailVerified, image, role, restricted },
            });
        }

        // Account table
        for (const { id, accountId, providerId, userId, password } of accountData) {
            await Prisma.account.create({
                data: { id, accountId, providerId, userId, password },
            });
        }

        // Ingredient table
        for (const { id, name, description, image } of ingredientData) {
            await Prisma.ingredient.create({
                data: { id, name, description, image },
            });
        }

        // Recipe table
        for (const recipe of recipeData) {
            const {
                id,
                title,
                description,
                numberOfServing,
                preparationTime,
                difficultyLevel,
                lunchStep,
                lunchType,
                Steps,
                status,
                userId,
                Image,
                Favorite,
                Review,
                Rating,
                Quantity,
            } = recipe;

            await Prisma.recipe.create({
                data: {
                    id,
                    title,
                    slug: title
                        .toLowerCase()
                        .replace(/œ/g, "oe")
                        .replace(/æ/g, "ae")
                        .replace(/ç/g, "c")
                        .replace(/'/g, "-")
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/\s+/g, "-"),
                    description,
                    numberOfServing,
                    preparationTime,
                    difficultyLevel,
                    lunchStep,
                    lunchType,
                    Steps,
                    status,
                    userId,

                    Image: {
                        create: Image.map(({ url, alt }) => ({
                            url,
                            alt,
                        })),
                    },

                    Favorite: {
                        create: Favorite.map(({ favorite, userId }) => ({
                            favorite,
                            userId,
                        })),
                    },

                    Review: {
                        create: Review.map(({ review, userId, thumbsPositive, thumbsNegative }) => ({
                            review,
                            userId,
                            thumbsPositive: {
                                connect: thumbsPositive.map((thumb) => ({ id: thumb })),
                            },
                            thumbsNegative: {
                                connect: thumbsNegative.map((thumb) => ({ id: thumb })),
                            },
                        })),
                    },

                    Rating: {
                        create: Rating.map(({ rating, userId }) => ({
                            rating,
                            userId,
                        })),
                    },

                    Quantity: {
                        create: Quantity.map(({ quantity, unit, ingredientId }) => ({
                            quantity,
                            unit,
                            ingredientId,
                        })),
                    },
                },
            });
        }

        // Fruit table
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
        await Prisma.fruit.deleteMany({});
        await Prisma.quantity.deleteMany({});
        await Prisma.rating.deleteMany({});
        await Prisma.review.deleteMany({});
        await Prisma.favorite.deleteMany({});
        await Prisma.image.deleteMany({});
        await Prisma.session.deleteMany({});
        await Prisma.account.deleteMany({});
        await Prisma.recipe.deleteMany({});
        await Prisma.ingredient.deleteMany({});
        await Prisma.user.deleteMany({});

        return true;
    } catch (error) {
        console.error("An error occurred ->", error);
        return false;
    }
};
