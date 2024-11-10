"use server";

import { InputRecipeUserType, RecipeUserType } from "@actions/types/RecipeUser";
import Prisma from "@lib/prisma";

export const GetRecipeUser = async (props: InputRecipeUserType): Promise<RecipeUserType | null> => {
    const { userId, recipeId } = props;

    const recipeUser = await Prisma.recipeUser.findUnique({
        where: {
            recipeId_userId: {
                userId,
                recipeId,
            },
        },
    });

    if (!recipeUser) {
        return null;
    }

    return recipeUser;
};

export interface UpdateRecipeUserProps extends InputRecipeUserType {
    favorite?: boolean;
    rating?: number | null;
    review?: string | null;
}

export const UpdateRecipeUser = async (props: UpdateRecipeUserProps) => {
    try {
        const { userId, recipeId, favorite, rating = null } = props;

        // Check if already in favorite
        const recipeUser = await GetRecipeUser({ userId, recipeId });

        let newRating;
        if (rating === undefined) newRating = recipeUser?.rating;
        else if (rating === null) newRating = null;
        else newRating = rating;

        if (recipeUser) {
            return await Prisma.recipeUser.update({
                data: {
                    favorite: favorite ?? recipeUser.favorite,
                    rating: newRating,
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
                    favorite,
                    rating,
                    userId,
                    recipeId,
                },
            });
        }
    } catch (error) {
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};
