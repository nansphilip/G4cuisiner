"use server";

export interface IdRecipeUserType {
    id: string;
}

export interface InputRecipeUserType {
    userId: string;
    recipeId: string;
}

export interface RecipeUserType {
    favorite: boolean;
    rating: number | null;
    review: string | null;
    recipeId: string;
    userId: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface RecipeUserFixtures {
    favorite: boolean;
    rating: number | null;
    review: string | null;
    recipeId: string;
    userId: string;
}
