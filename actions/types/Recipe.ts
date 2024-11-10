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

export interface TitleAndSlugRecipeType extends TitleRecipeType, SlugRecipeType {}

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
    totalFavoriteAmount: number;
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
        review: string;
        rating: number | null;
        thumbsPositive: number;
        thumbsNegative: number;
    }[];
}

export interface RecipeFixtures {
    id: string;
    title: string;
    // slug is generated from title
    description: string;
    numberOfServing: number | null;
    preparationTime: number | null;
    difficultyLevel: "EASY" | "MEDIUM" | "HARD";
    lunchType: "BREAKFAST" | "LUNCH" | "BRUNCH" | "DINNER" | "SNACK";
    lunchStep: "APPETIZER" | "STARTER" | "MAIN" | "DESSERT";
    userId: string;

    Image: {
        url: string;
        alt: string;
    }[];

    Favorite: {
        favorite: boolean;
        userId: string;
    }[];

    Review: {
        review: string;
        userId: string;
        thumbsPositive: string[]; // userId
        thumbsNegative: string[]; // userId
    }[];

    Rating: {
        rating: number;
        userId: string;
    }[];

    Quantity: {
        quantity: number;
        unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE";
        ingredientId: string;
    }[];
}
