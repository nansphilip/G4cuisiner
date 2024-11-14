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

export interface IngredientRecipeType {
    ingredientList: {
        quantity: number;
        unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE";
        ingredientId: string;
    }[];
}

export interface CommonType extends TitleRecipeType {
    description: string;

    numberOfServing: number;
    preparationTime: number;
    Steps: string;
    difficultyLevel: "EASY" | "MEDIUM" | "HARD"; // default medium
    lunchType: "BREAKFAST" | "LUNCH" | "BRUNCH" | "DINNER" | "SNACK";
    lunchStep: "APPETIZER" | "STARTER" | "MAIN" | "DESSERT";

    userId: string;
}

export interface CreateRecipeType extends CommonType, ImageRecipeType, IngredientRecipeType {}

export interface UpdateRecipeType extends IdRecipeType, CreateRecipeType {}

export interface RecipeType extends IdRecipeType, CommonType, SlugRecipeType {
    createdAt: Date;
    updatedAt: Date;
}

export interface CompleteRecipeType extends RecipeType, ImageRecipeType {
    ratingAverage: number;
    totalFavoriteAmount: number;
    totalRatingAmount: number;
    ingredientList: {
        ingredientId: string;
        // recipeId: string;
        name: string;
        description: string;
        image: string | null;
        quantity: number;
        unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE";
    }[];
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

export interface RecipeFixtures {
    id: string;
    title: string;
    // slug is generated from title
    description: string;
    numberOfServing: number;
    preparationTime: number;
    difficultyLevel: "EASY" | "MEDIUM" | "HARD";
    lunchType: "BREAKFAST" | "LUNCH" | "BRUNCH" | "DINNER" | "SNACK";
    lunchStep: "APPETIZER" | "STARTER" | "MAIN" | "DESSERT";
    Steps: string;
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

export interface RecipeFilterType {
    title: string;
    preparationTime: number;
    difficultyLevel: "EASY" | "MEDIUM" | "HARD";
    lunchType: "BREAKFAST" | "LUNCH" | "BRUNCH" | "DINNER" | "SNACK";
    lunchStep: "APPETIZER" | "STARTER" | "MAIN" | "DESSERT";
    slug: string;
    url: string;
    alt: string;
}
