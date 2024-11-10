"use server";

export interface InputFavoriteType {
    userId: string;
    recipeId: string;
}

export interface CreateUpdateFavoriteType extends InputFavoriteType {
    favorite: boolean;
}

export interface FavoriteType {
    favorite: boolean;
    userId: string;
    recipeId: string;
}