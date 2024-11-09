"use server";

import { InputRecipeUserType, RecipeUserType } from "@actions/types/RecipeUser";
import Prisma from "@lib/prisma";

export const GetRecipeUser = async (props: InputRecipeUserType): Promise<RecipeUserType | null> => {
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

export interface UpdateRecipeUserProps extends InputRecipeUserType {
    favorite?: boolean;
    rating?: number | null;
    review?: string | null;
}

export const UpdateRecipeUser = async (props: UpdateRecipeUserProps) => {
    try {
        const { userId, recipeId, favorite, rating = null, review = null } = props;

        // Check if already in favorite
        const recipeUser = await GetRecipeUser({ userId, recipeId });

        if (recipeUser) {
            return await Prisma.recipeUser.update({
                data: {
                    favorite: favorite ?? recipeUser.favorite,
                    rating: rating ?? recipeUser.rating,
                    review: review ?? recipeUser.review,
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
                    review,
                    userId,
                    recipeId,
                },
            });
        }
    } catch (error) {
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};
