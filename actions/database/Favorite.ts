"use server";

import {
    CreateFavoriteType,
    SelectFavoriteType,
    UpdateFavoriteType,
    ReturnFavoriteType,
    ReturnFavoriteRecipeUserType,
} from "@actions/types/Favorite";
import Prisma from "@lib/prisma";

export const CreateFavorite = async (props: CreateFavoriteType): Promise<ReturnFavoriteType> => {
    try {
        const { userId, recipeId, favorite } = props;
        const existingFavorite = await SelectFavorite({ userId, recipeId });
        if (existingFavorite) {
            return await UpdateFavorite(props);
        }
        const createdFavorite = await Prisma.favorite.create({
            data: {
                favorite,
                userId,
                recipeId,
            },
        });
        return createdFavorite;
    } catch (error) {
        throw new Error("CreateFavorite -> " + (error as Error).message);
    }
};

export const SelectFavorite = async (props: SelectFavoriteType) => {
    try {
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
    } catch (error) {
        throw new Error("SelectFavorite -> " + (error as Error).message);
    }
};

export async function SelectFavoriteRecipeUser(userId: string): Promise<ReturnFavoriteRecipeUserType[]> {
    try {
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
                        Review : {
                            select: {
                                id: true,
                                review: true,
                                userId: true,
                                createdAt: true,
                                User: {
                                    select: {
                                        name: true,
                                    }
                                }
                            },
                            orderBy: {
                                createdAt: 'desc',
                            },
                        }
                    },
                },
            },
        });
        const recipeList = recipeData.map(({ Recipe }) => {
            // Calculate average rating
            const notNullRatingList = Recipe.Rating.map(({ rating }) => rating).filter((rating) => rating !== null); // TODO : check if correct
            const ratingAverage =
                Math.trunc((notNullRatingList.reduce((acc, rate) => acc + rate, 0) / notNullRatingList.length) * 100) /
                100;

            const totalFavoriteAmount = Recipe.Favorite.filter(({ favorite }) => favorite).length;
            const totalRatingAmount = Recipe.Rating.length;

            const latestReview = Recipe.Review[0] || null;


            return {
                recipeId: Recipe.id,
                title: Recipe.title,
                slug: Recipe.slug,
                description: Recipe.description,
                ratingAverage,
                totalRatingAmount,
                totalFavoriteAmount,
                latestReview,
                userFavorite: Recipe.Favorite[0].favorite,
                imageList: Recipe.Image.map(({ url, alt }) => ({
                    url,
                    alt,
                })),
            };
        });
        return recipeList;

    } catch (error) {
        throw new Error("SelectFavoriteRecipeUser -> " + (error as Error).message);
    }
}

export const UpdateFavorite = async (props: UpdateFavoriteType): Promise<ReturnFavoriteType> => {
    try {
        const { userId, recipeId, favorite } = props;
        const existingFavorite = await SelectFavorite({ userId, recipeId });
        if (!existingFavorite) {
            return await CreateFavorite(props);
        }
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
        throw new Error("UpdateFavorite -> " + (error as Error).message);
    }
};
