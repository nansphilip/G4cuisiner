"use server";

import { InputRecipeUserType, RecipeUserType } from "@actions/types/RecipeUser";
import Prisma from "@lib/prisma";

export const GetFavorite = async (props: InputRecipeUserType): Promise<RecipeUserType | null> => {
    const { userId, recipeId } = props;

    const favorite = await Prisma.recipeUser.findUnique({
        where: {
            recipeId_userId: {
                userId,
                recipeId,
            },
        },
    });

    if (!favorite) {
        return null;
    }

    return favorite;
};

export const AddFavorite = async (props: InputRecipeUserType) => {
    try {
        const { userId, recipeId } = props;

        // Check if already in favorite
        const favorite = await GetFavorite({ userId, recipeId });

        if (favorite) {
            return await Prisma.recipeUser.update({
                data: {
                    favorite: true,
                },
                where: {
                    recipeId_userId: {
                        userId,
                        recipeId,
                    },
                },
            });
        } else {
            return await Prisma.recipeUser.create({
                data: {
                    userId,
                    recipeId,
                    favorite: true,
                },
            });
        }
    } catch (error) {
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};

export const RemoveFavorite = async (props: InputRecipeUserType) => {
    try {
        const { userId, recipeId } = props;

        // Check if already in favorite
        const favorite = await GetFavorite({ userId, recipeId });

        if (favorite) {
            return await Prisma.recipeUser.update({
                data: {
                    favorite: false,
                },
                where: {
                    recipeId_userId: {
                        userId,
                        recipeId,
                    },
                },
            });
        } else {
            return await Prisma.recipeUser.create({
                data: {
                    userId,
                    recipeId,
                    favorite: false,
                },
            });
        }
    } catch (error) {
        throw new Error("Unable to remove recipe -> " + (error as Error).message);
    }
};
