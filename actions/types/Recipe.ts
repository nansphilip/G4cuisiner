"use server";

export interface IdRecipeType {
    id: string;
}

export interface LunchType {
    id: number;
    name: string;
}

export interface LunchStep {
    id: number;
    name: string;
}

export interface LunchType {
    id: number;
    name: string;
}

export interface LunchStep {
    id: number;
    name: string;
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
    // ingredientIdList: Prisma.IngredientUncheckedCreateNestedManyWithoutRecipeIdListInput | Prisma.IngredientCreateNestedManyWithoutRecipeIdListInput | undefined;
    userId: string;
    preparationTime: number | null;
}

export interface UpdateRecipeType extends IdRecipeType, CreateRecipeType {}

export interface RecipeType
    extends IdRecipeType,
        SlugRecipeType,
        CreateRecipeType {
    createdAt: Date;
    updatedAt: Date;
}

export interface TitleAndSlugRecipeType
    extends TitleRecipeType,
        SlugRecipeType {}
