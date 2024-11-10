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

export interface ImageRecipeType {
    imageList: {
        url: string;
        alt: string;
    }[];
}

export interface CommonType extends TitleRecipeType, SlugRecipeType {
    description: string;

    numberOfServing: number | null;
    preparationTime: number | null;

    difficultyLevel: "EASY" | "MEDIUM" | "HARD"; // default medium
    lunchType: "BREAKFAST" | "LUNCH" | "BRUNCH" | "DINNER" | "SNACK";
    lunchStep: "APPETIZER" | "STARTER" | "MAIN" | "DESSERT";

    userId: string;
}

export interface CreateRecipeType extends CommonType, ImageRecipeType {}

export interface UpdateRecipeType extends IdRecipeType, CreateRecipeType {}

export interface RecipeType extends IdRecipeType, CommonType {
    createdAt: Date;
    updatedAt: Date;
}

export interface CompleteRecipeType extends RecipeType, ImageRecipeType {
    ratingAverage: number;
    ingredientList: {
        ingredientId: string;
        recipeId: string;
        name: string;
        description: string;
        quantity: number;
        unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE";
    }[];
    reviewList: {
        userId: string;
        name: string;
        rating: number | null;
        favorite: boolean;
        review: string | null;
    }[];
}

export interface TitleAndSlugRecipeType extends TitleRecipeType, SlugRecipeType {}

export interface RecipeFixtures {
    id: string;
    title: string;
    description: string;
    numberOfServing: number | null;
    preparationTime: number | null;
    difficultyLevel: "EASY" | "MEDIUM" | "HARD";
    lunchType: "BREAKFAST" | "LUNCH" | "BRUNCH" | "DINNER" | "SNACK";
    lunchStep: "APPETIZER" | "STARTER" | "MAIN" | "DESSERT";
    userId: string;
    imageList: {
        url: string;
        alt: string;
    }[];
}
