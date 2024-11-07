"use server";

export interface RecipeUserFixtures {
    favorite: boolean | null;
    rating: number | null;
    recipeId: string;
    userId: string;
}