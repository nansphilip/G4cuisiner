"use server";

export interface IdRecipeType {
    id: string;
}

export interface TitleRecipeType {
    title: string;
}

export interface SlugRecipeType {
    slug: string;
}

export interface CreateRecipeType extends TitleRecipeType {
    description: string;
    image: string | null;
    userId: string;

    numberOfServing: number | null;
    preparationTime: number | null;

    difficultyLevel: "EASY" | "MEDIUM" | "HARD"; // default medium
    lunchType: "BREAKFAST" | "LUNCH" | "BRUNCH" | "DINNER" | "SNACK";
    lunchStep: "APPETIZER" | "STARTER" | "MAIN" | "DESSERT";

    favoriteUsers: [];
    ingredients: [];
}

export interface UpdateRecipeType extends IdRecipeType, CreateRecipeType {}

export interface RecipeType extends IdRecipeType, SlugRecipeType, CreateRecipeType {
    createdAt: Date;
    updatedAt: Date;
}

export interface TitleAndSlugRecipeType extends TitleRecipeType, SlugRecipeType {}
