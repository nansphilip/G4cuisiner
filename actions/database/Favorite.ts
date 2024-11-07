"use server";

import { UpdateFavoriteType } from "@actions/types/Favorite";
import Prisma from "@lib/prisma";

export const AddFavorite = async (props: UpdateFavoriteType) => {
    try {
        const { userId, recipeId } = props;

        // TODO : Check if already in favorite

        await Prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                RecipeUser: {
                    set: {
                        favorite: true,
                    },
                    where: {
                        id: recipeId,
                    }
                },
            },
        });
    } catch (error) {
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};

export const RemoveFavorite = async (props: UpdateFavoriteType) => {
    try {
        const { userId, recipeId } = props;

        // TODO : Check if already in favorite

        await Prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                RecipeUser: {
                    set: {
                        favorite: false,
                    },
                    where: {
                        id: recipeId,
                    }
                },
            },
        });
    } catch (error) {
        throw new Error("Unable to remove recipe -> " + (error as Error).message);
    }
};
