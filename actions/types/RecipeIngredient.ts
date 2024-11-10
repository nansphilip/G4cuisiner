"use server";

export interface RecipeIngredientFixtures {
    quantity: number;
    unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE"
    recipeId: string;
    ingredientId: string;
}