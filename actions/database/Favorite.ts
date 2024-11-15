"use server";

import { InputFavoriteType, FavoriteType, CreateUpdateFavoriteType, SelectRecipeUserFavoriteType } from "@actions/types/Favorite";
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
export async function SelectRecipeUserFavorite(userId: string): Promise<SelectRecipeUserFavoriteType[]> {
    const recipeData = await Prisma.favorite.findMany({
        where: { userId: userId, favorite: true },
        select: {
            Recipe: {
                include: {
                    Image: true,
                    Rating: {
                        select: {
                            rating: true,
                        },
                    },
                    Favorite: {
                        select: {
                            favorite: true,
                        },
                        where: {
                            userId: userId,
                        },
                    },
                },
            },
        },
    });

    const recipes = recipeData.map(({ Recipe }) => {
        const notNullRatingList = Recipe.Rating.map(({ rating }) => rating).filter((rating) => rating !== null); // TODO : check if correct
        const ratingAverage =
            Math.trunc((notNullRatingList.reduce((acc, rate) => acc + rate, 0) / notNullRatingList.length) * 100) / 100;

            const totalFavoriteAmount = Recipe.Favorite.filter(({ favorite }) => favorite).length;
            const totalRatingAmount = Recipe.Rating.length;

        return {
            id: Recipe.id,
            title: Recipe.title,
            slug: Recipe.slug,
            description: Recipe.description,
            ratingAverage,
            totalFavoriteAmount,
            totalRatingAmount,
            userFavorite: Recipe.Favorite[0].favorite,
            images: {
                url: Recipe.Image[0].url,
                alt: Recipe.Image[0].alt,
            },
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
