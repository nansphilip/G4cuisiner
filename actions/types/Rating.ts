"use server";

import Prisma from "@prisma/client";

export type Rating = Prisma.Rating;

export type rating = Rating["rating"];
export type id = Rating["id"];
export type userId = Rating["userId"];
export type recipeId = Rating["recipeId"];
export type createdAt = Rating["createdAt"];
export type updatedAt = Rating["updatedAt"];

export interface CreateRatingType {
    rating: rating;
    userId: userId;
    recipeId: recipeId;
}

export interface SelectRatingType {
    userId: userId;
    recipeId: recipeId;
}

export interface UpdateRatingType {
    rating: rating;
    userId: userId;
    recipeId: recipeId;
}

export interface ReturnRatingType {
    rating: rating;
    id: id;
    userId: userId;
    recipeId: recipeId;
    createdAt: createdAt;
    updatedAt: updatedAt;
}
