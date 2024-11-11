"use server";

export interface InputReviewType {
    userId: string;
    recipeId: string;
    review: string;
}

export interface ReviewType {
    id: string;
    review: string;
    userId: string;
    recipeId: string;
}