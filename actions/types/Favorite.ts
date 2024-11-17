"use server";

import Prisma from "@prisma/client";

export type Favorite = Prisma.Favorite;

export type favorite = Favorite["favorite"];
export type id = Favorite["id"];
export type userId = Favorite["userId"];
export type recipeId = Favorite["recipeId"];
export type createdAt = Favorite["createdAt"];
export type updatedAt = Favorite["updatedAt"];

export interface CreateFavoriteType {
    userId: userId;
    recipeId: recipeId;
    favorite: favorite;
}

export interface SelectFavoriteType {
    userId: userId;
    recipeId: recipeId;
}

export interface UpdateFavoriteType {
    userId: userId;
    recipeId: recipeId;
    favorite: favorite;
}

export interface ReturnFavoriteType {
    favorite: favorite;
    id: id;
    userId: userId;
    recipeId: recipeId;
    createdAt: createdAt;
    updatedAt: updatedAt;
}

export interface ReturnFavoriteRecipeUserType {
    recipeId: recipeId;
    title: string;
    slug: string;
    description: string;
    ratingAverage: number;
    totalRatingAmount: number;
    totalFavoriteAmount: number;
    userFavorite: favorite;
    imageList: {
        url: string;
        alt: string;
    }[];
    latestReview: {
        review: string;
        userId: string;
        userName: string
        createdAt: string;
    } | null;
}
