"use server";

export interface IdInputReviewType {
    reviewId: string;
}

export interface InputReviewType {
    userId: string;
    recipeId: string;
    review: string;
}

export interface InputThumbsType {
    userId: string;
    reviewIdList: string[];
}

export interface UpdateReviewType {
    reviewId: string;
    userId: string;
    thumbsPositive: boolean;
    thumbsNegative: boolean;
}

export interface ReviewType {
    id: string;
    review: string;
    userId: string;
    recipeId: string;
    createdAt: Date;
    updatedAt: Date;
}