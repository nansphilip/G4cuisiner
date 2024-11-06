"use server";

import { FavoriteType, UpdateFavoriteType } from "@actions/types/Favorite";
import { IdUserType } from "@actions/types/User";
import Prisma from "@lib/prisma";
import { SelectRecipeById } from "./Recipe";

export const SelectFavoriteByUserId = async (props: IdUserType): Promise<FavoriteType[] | null> => {
    try {
        const { id } = props;
        const user = await Prisma.user.findUnique({
            select: {
                Favorite: {
                    select: {
                        id: true,
                    },
                },
            },
            where: {
                id,
            },
        });
        if (!user) {
            return null;
        }
        const { Favorite: favoriteList } = user;
        if (!favoriteList.length) {
            return null;
        }
        return favoriteList;
    } catch (error) {
        throw new Error("Unable to select recipe -> " + (error as Error).message);
    }
};

export const AddFavorite = async (props: UpdateFavoriteType) => {
    try {
        const { userId, recipeId } = props;

        // Check if the user exists
        const recipe = await SelectRecipeById({ id: recipeId });
        if (!recipe) {
            throw new Error("Recipe not found");
        }
        
        // Check if the recipe is already in the user's favorite list
        const favoriteList = await SelectFavoriteByUserId({ id: userId });
        const isAlreadyFavorite = favoriteList?.some(favorite => favorite.id === recipeId);
        if (isAlreadyFavorite) {
            throw new Error("Recipe is already in favorites");
        }

        await Prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                Favorite: {
                    connect: { id: recipeId },
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

        // Check if the user exists
        const recipe = await SelectRecipeById({ id: recipeId });
        if (!recipe) {
            throw new Error("Recipe not found");
        }

        await Prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                Favorite: {
                    disconnect: { id: recipeId },
                },
            },
        });
    } catch (error) {
        throw new Error("Unable to remove recipe -> " + (error as Error).message);
    }
};
