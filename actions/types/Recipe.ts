"use server";

import Prisma from "@prisma/client";

export type Recipe = Prisma.Recipe;

export type id = Recipe["id"];
export type title = Recipe["title"];
export type slug = Recipe["slug"];
export type description = Recipe["description"];
export type numberOfServing = Recipe["numberOfServing"];
export type preparationTime = Recipe["preparationTime"];
export type difficultyLevel = Recipe["difficultyLevel"];
export type lunchType = Recipe["lunchType"];
export type lunchStep = Recipe["lunchStep"];
export type instructions = Recipe["instructions"];
export type status = Recipe["status"];
export type userId = Recipe["userId"];
export type createdAt = Recipe["createdAt"];
export type updatedAt = Recipe["updatedAt"];

export interface IdRecipeType {
    id: id;
}

export interface TitleRecipeType {
    title: title;
}

export interface SlugRecipeType {
    slug: slug;
}

export interface StatusRecipeType {
    status: status;
}

export interface ImageRecipeType {
    imageList: {
        url: string;
        alt: string;
    }[];
}

export interface IngredientRecipeType {
    ingredientList: {
        ingredientId: string;
        name: string;
        description: string;
        image: string | null;
        quantity: number;
        unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE";
    }[];
}

export interface ReviewRecipeType {
    reviewList: {
        reviewId: string;
        userId: string;
        name: string;
        review: string;
        rating: number | null;
        thumbsPositive: number;
        thumbsNegative: number;
        createdAt: Date;
    }[];
}

export interface TitleAndSlugRecipeType extends TitleRecipeType, SlugRecipeType {}

export interface CommonType extends TitleRecipeType {
    description: description;
    numberOfServing: numberOfServing;
    preparationTime: preparationTime;
    instructions: instructions;
    difficultyLevel: difficultyLevel;
    lunchType: lunchType;
    lunchStep: lunchStep;
    userId: userId;
}

export interface CreateRecipeType extends CommonType {
    imageNameList: string[];
    ingredientList: {
        ingredientId: string;
        quantity: number;
        unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE";
    }[];
}

export interface UpdateRecipeType {
    id: id;
    data: {
        title?: title;
        description?: description;
        numberOfServing?: numberOfServing;
        preparationTime?: preparationTime;
        difficultyLevel?: difficultyLevel;
        lunchType?: lunchType;
        lunchStep?: lunchStep;
        instructions?: instructions;
        status?: status;
        userId?: userId;
        createdAt?: createdAt;
        updatedAt?: updatedAt;
    };
}

export interface ReturnSelectLastRecipe extends ImageRecipeType {
    title: title;
    slug: slug;
}

export interface ReturnRecipeType extends IdRecipeType, CommonType, SlugRecipeType, StatusRecipeType {
    createdAt: createdAt;
    updatedAt: updatedAt;
}

export interface CompleteRecipeType extends ReturnRecipeType, ImageRecipeType, IngredientRecipeType, ReviewRecipeType {
    ratingAverage: number;
    totalFavoriteAmount: number;
    totalRatingAmount: number;
}

export interface SelectRecipeByFilterType {
    lunchType: lunchType[];
    lunchStep: lunchStep[];
    preparationTime: preparationTime;
}

export interface ReturnSelectRecipeByFilterType extends IdRecipeType, TitleRecipeType, SlugRecipeType, ImageRecipeType {
    description: string;
    ratingAverage: number;
}

export interface SelectEveryRecipeType extends TitleRecipeType, SlugRecipeType, ImageRecipeType {
    lunchType: lunchType;
    lunchStep: lunchStep;
    preparationTime: preparationTime;
    difficultyLevel: difficultyLevel;
}