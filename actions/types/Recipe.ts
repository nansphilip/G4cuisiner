"use server";

export interface IdRecipeType {
    id: string;
}

export interface NameRecipeType {
    name: string;
}

export interface SlugRecipeType {
    slug: string;
}

export interface CreateRecipeType extends NameRecipeType {
    description: string;
    image: string | null;
}

export interface RecipeType extends IdRecipeType, SlugRecipeType, CreateRecipeType {
    createdAt: Date;
    updatedAt: Date;
};

export interface NameAndSlugRecipeType extends NameRecipeType, SlugRecipeType {};