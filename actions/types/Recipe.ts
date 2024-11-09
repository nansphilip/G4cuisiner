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

export interface CreateRecipeType extends TitleRecipeType, SlugRecipeType {
    description: string;
    image: string | null;

    numberOfServing: number | null;
    preparationTime: number | null;

    difficultyLevel: "EASY" | "MEDIUM" | "HARD"; // default medium
    lunchType: "BREAKFAST" | "LUNCH" | "BRUNCH" | "DINNER" | "SNACK";
    lunchStep: "APPETIZER" | "STARTER" | "MAIN" | "DESSERT";

    userId: string;
}

export interface UpdateRecipeType extends IdRecipeType, CreateRecipeType {}

export interface RecipeType extends IdRecipeType, CreateRecipeType {
    createdAt: Date;
    updatedAt: Date;
}

export interface IngredientType {
    name: string;
    description: string;
    image: string | null;
    quantity: number;
    unit: string;
}

export interface CompleteRecipeType extends RecipeType {
    ingredientList: IngredientType[];
    ratingAverage: number;
}

export interface TitleAndSlugRecipeType extends TitleRecipeType, SlugRecipeType {}

export interface RecipeFixtures {
    id: string;
    title: string;
    description: string;
    image: string | null;
    numberOfServing: number | null;
    preparationTime: number | null;
    difficultyLevel: "EASY" | "MEDIUM" | "HARD";
    lunchType: "BREAKFAST" | "LUNCH" | "BRUNCH" | "DINNER" | "SNACK";
    lunchStep: "APPETIZER" | "STARTER" | "MAIN" | "DESSERT";
    userId: string;
}
