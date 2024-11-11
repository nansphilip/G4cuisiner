"use server";

export interface InputRatingType {
    userId: string;
    recipeId: string;
}

export interface CreateUpdateRatingType extends InputRatingType {
    rating: number;
}

export interface RatingType {
    rating: number | null;
    userId: string;
    recipeId: string;
}