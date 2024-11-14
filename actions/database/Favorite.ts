"use server";

import { InputFavoriteType, FavoriteType, CreateUpdateFavoriteType } from "@actions/types/Favorite";
import Prisma from "@lib/prisma";

export const CreateFavorite = async (props: CreateUpdateFavoriteType): Promise<FavoriteType> => {
    try {
        const { userId, recipeId, favorite } = props;

        // Check if favorite already exists
        const existingFavorite = await SelectFavorite({ userId, recipeId });

        // If favorite already exists, update it
        if (existingFavorite) {
            return UpdateFavorite(props);
        }

        // Create favorite
        const updatedFavorite = await Prisma.favorite.create({
            data: {
                favorite,
                userId,
                recipeId,
            },
        });

        return updatedFavorite;
    } catch (error) {
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};

export const SelectFavorite = async (props: InputFavoriteType): Promise<FavoriteType | null> => {
    const { userId, recipeId } = props;

    // Get favorite
    const favorite = await Prisma.favorite.findUnique({
        where: {
            userId_recipeId: {
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

// Get All Favorites
export async function fetchUserFavorites(userId: string) {
    const userWithFavorites = await Prisma.favorite.findMany({
        where: { userId: userId , favorite : true},
        select: {
            Recipe: {
                include: {
                    Image: true,
                },
            },
        },
    });

    const recipes = userWithFavorites.map((fav) => {
        const recipe = fav.Recipe;
        return {
            ...recipe,
            images: recipe.Image,
        };
    });

    return recipes;
}

export const UpdateFavorite = async (props: CreateUpdateFavoriteType): Promise<FavoriteType> => {
    try {
        const { userId, recipeId, favorite } = props;

        // Check if favorite already exists
        const existingFavorite = await SelectFavorite({ userId, recipeId });

        // If favorite does not exist, create it
        if (!existingFavorite) {
            return CreateFavorite(props);
        }

        // Update favorite
        const updatedFavorite = await Prisma.favorite.update({
            data: {
                favorite,
            },
            where: {
                userId_recipeId: {
                    userId,
                    recipeId,
                },
            },
        });

        return updatedFavorite;
    } catch (error) {
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};
