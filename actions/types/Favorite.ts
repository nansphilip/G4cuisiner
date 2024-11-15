"use server";

export interface InputFavoriteType {
    userId: string;
    recipeId: string;
}

export interface CreateUpdateFavoriteType extends InputFavoriteType {
    favorite: boolean;
}

export interface SelectRecipeUserFavoriteType {
    id: string;
    title: string;
    slug: string;
    description: string;
    images: {
        url: string;
        alt: string;
    }[];
    ratingAverage: number;
    totalRatingAmount: number;
    totalFavoriteAmount: number;
    userFavorite: boolean;
}

export interface FavoriteType {
    favorite: boolean;
    userId: string;
    recipeId: string;
}