"use server";

export interface FavoriteType {
    id: string;
}

export interface UpdateFavoriteType {
    userId: string;
    recipeId: string;
}