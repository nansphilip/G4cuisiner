"use server";

import { InputFavoriteType, FavoriteType, CreateUpdateFavoriteType } from "@actions/types/Favorite";
import Prisma from "@lib/prisma";

export const CreateFavorite = async (props: CreateUpdateFavoriteType): Promise<FavoriteType> => {
    try {
        const { userId, recipeId, favorite } = props;

        // Check if favorite already exists
        const existingFavorite = await GetFavorite({ userId, recipeId });

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

export const GetFavorite = async (props: InputFavoriteType): Promise<FavoriteType | null> => {
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

export const UpdateFavorite = async (props: CreateUpdateFavoriteType): Promise<FavoriteType> => {
    try {
        const { userId, recipeId, favorite } = props;

        // Check if favorite already exists
        const existingFavorite = await GetFavorite({ userId, recipeId });

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