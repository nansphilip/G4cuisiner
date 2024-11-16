"use server";

import Prisma from "@prisma/client";

export type Review = Prisma.Review;

export type review= Review["review"];
export type id= Review["id"];
export type userId= Review["userId"];
export type recipeId= Review["recipeId"];
export type createdAt= Review["createdAt"];
export type updatedAt= Review["updatedAt"];

export interface CreateReviewType {
    userId: userId;
    recipeId: recipeId;
    review: review;
}

export interface SelectReviewType {
    userId: userId;
    recipeId: recipeId;
    review: review;
}

export interface SelectReviewByIdType {
    reviewId: id;
}

export interface GetReviewThumbType {
    userId: userId;
    reviewIdList: id[];
}

export interface UpdateReviewType {
    userId: userId;
    reviewId: id;
    thumbsPositive: boolean;
    thumbsNegative: boolean;
}

export interface ReturnReviewType {
    review: string;
    id: string;
    userId: string;
    recipeId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReturnReviewThumbTypeType { positive: boolean; negative: boolean }