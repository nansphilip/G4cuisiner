"use server";

import Prisma from "@lib/prisma";
import {
    IdRecipeType,
    CreateRecipeType,
    RecipeType,
    TitleRecipeType,
    SlugRecipeType,
    TitleAndSlugRecipeType,
    UpdateRecipeType,
    CompleteRecipeType,
} from "@actions/types/Recipe";

export const CreateRecipe = async (props: CreateRecipeType): Promise<RecipeType> => {
    try {
        const {
            title,
            description,
            numberOfServing,
            preparationTime,
            difficultyLevel,
            lunchType,
            lunchStep,
            userId,
            imageList,
        } = props;
        // Check if recipe already exists
        const existingRecipe = await SelectRecipeByTitle({ title });
        if (existingRecipe) {
            throw new Error("Recipe already exists");
        }
        // Create slug
        const slug = title
            .toLowerCase()
            .replace(/œ/g, "oe")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-");
        // Check if slug already exists
        const existingSlug = await SelectRecipeBySlug({ slug });
        if (existingSlug) {
            throw new Error("Slug already exists");
        }
        // Create recipe
        const recipe = await Prisma.recipe.create({
            data: {
                title,
                slug,
                description,
                numberOfServing,
                preparationTime,
                difficultyLevel,
                lunchType,
                lunchStep,
                userId,
                RecipeImage: {
                    create: imageList.map(({ url, alt }) => ({
                        url,
                        alt,
                    })),
                },
            },
        });
        return recipe;
    } catch (error) {
        throw new Error("Unable to create recipe -> " + (error as Error).message);
    }
};

export const SelectRecipeById = async (props: IdRecipeType): Promise<RecipeType | null> => {
    try {
        const { id } = props;
        const recipe = await Prisma.recipe.findUnique({
            where: {
                id,
            },
        });
        if (!recipe) {
            return null;
        }
        return recipe;
    } catch (error) {
        throw new Error("Unable to select recipe -> " + (error as Error).message);
    }
};

export const SelectRecipeByTitle = async (props: TitleRecipeType): Promise<RecipeType | null> => {
    try {
        const { title } = props;
        const recipe = await Prisma.recipe.findUnique({
            where: {
                title,
            },
        });
        if (!recipe) {
            return null;
        }
        return recipe;
    } catch (error) {
        throw new Error("Unable to select recipe -> " + (error as Error).message);
    }
};

export const SelectRecipeBySlug = async (props: SlugRecipeType): Promise<CompleteRecipeType | null> => {
    try {
        const { slug } = props;
        const recipe = await Prisma.recipe.findUnique({
            where: {
                slug,
            },
            include: {
                RecipeIngredient: {
                    select: {
                        ingredient: {
                            select: {
                                name: true,
                                description: true,
                            },
                        },
                        quantity: true,
                        unit: true,
                        recipeId: true,
                        ingredientId: true,
                    },
                },
                RecipeUser: {
                    select: {
                        rating: true,
                        favorite: true,
                    },
                },
                Review: {
                    select: {
                        userId: true,
                        review: true,
                        thumbsPositive: true,
                        thumbsNegative: true,
                        User: {
                            select: {
                                name: true,
                                RecipeUser: {
                                    select: {
                                        rating: true,
                                    },
                                }
                            },
                        },
                    },
                },
                RecipeImage: {
                    select: {
                        url: true,
                        alt: true,
                    },
                },
            },
        });
        if (!recipe) {
            return null;
        }

        // Calculate average rating
        const notNullRatingList = recipe.RecipeUser.map((RU) => RU.rating).filter((rating) => rating !== null);
        const ratingAverage =
            Math.trunc((notNullRatingList.reduce((acc, rate) => acc + rate, 0) / notNullRatingList.length) * 100) / 100;

        // Calculate total favorite amount
        const totalFavoriteAmount = recipe.RecipeUser.filter((RU) => RU.favorite).length;

        const recipeFormatted = {
            id: recipe.id,
            title: recipe.title,
            slug: recipe.slug,
            description: recipe.description,
            numberOfServing: recipe.numberOfServing,
            preparationTime: recipe.preparationTime,
            difficultyLevel: recipe.difficultyLevel,
            lunchType: recipe.lunchType,
            lunchStep: recipe.lunchStep,
            userId: recipe.userId,
            createdAt: recipe.createdAt,
            updatedAt: recipe.updatedAt,
            ratingAverage,
            totalFavoriteAmount,
            imageList: recipe.RecipeImage,
            reviewList: recipe.Review.map((review) => ({
                userId: review.userId,
                name: review.User.name,
                rating: review.User.RecipeUser[0].rating, // check if correct
                review: review.review,
                thumbsPositive: review.thumbsPositive.length,
                thumbsNegative: review.thumbsNegative.length,
            })),
            ingredientList: recipe.RecipeIngredient.map((RI) => ({
                ingredientId: RI.ingredientId,
                recipeId: RI.recipeId,
                name: RI.ingredient.name,
                description: RI.ingredient.description,
                quantity: RI.quantity,
                unit: RI.unit,
            })),
        };
        return recipeFormatted;
    } catch (error) {
        throw new Error("Unable to select recipe -> " + (error as Error).message);
    }
};

export const SelectEveryRecipeSlugs = async (): Promise<TitleAndSlugRecipeType[]> => {
    try {
        const recipeList = await Prisma.recipe.findMany({
            select: {
                title: true,
                slug: true,
            },
        });
        if (!recipeList) {
            throw new Error("No recipe found");
        }
        return recipeList;
    } catch (error) {
        throw new Error("Unable to select many recipe slugs -> " + (error as Error).message);
    }
};

export const SelectEveryRecipes = async (): Promise<RecipeType[]> => {
    try {
        const recipeList = await Prisma.recipe.findMany();
        if (!recipeList) {
            throw new Error("No recipe found");
        }
        return recipeList;
    } catch (error) {
        throw new Error("Unable to select many recipes -> " + (error as Error).message);
    }
};

export const UpdateRecipeById = async (props: UpdateRecipeType): Promise<RecipeType> => {
    try {
        const { id, title, description, imageList, userId } = props;
        // Check if recipe exists
        const existingRecipe = await SelectRecipeById({ id });
        if (!existingRecipe) {
            throw new Error("Recipe does not exist");
        }
        // Check if new title is available
        const isNewTitleAlreadyExists = await SelectRecipeByTitle({ title });
        if (isNewTitleAlreadyExists && isNewTitleAlreadyExists.id !== id) {
            throw new Error("New title already exists");
        }
        // Create slug
        const slug = title
            .toLowerCase()
            .replace(/œ/g, "oe")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-");
        // Check if slug already exists
        const existingSlug = await SelectRecipeBySlug({ slug });
        if (existingSlug) {
            throw new Error("Slug already exists");
        }

        const recipe = await Prisma.recipe.update({
            where: {
                id,
            },
            data: {
                title,
                slug,
                description,
                userId,
                RecipeImage: {
                    create: imageList.map(({ url, alt }) => ({
                        url,
                        alt,
                    })),
                },
            },
        });
        return recipe;
    } catch (error) {
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};

export const DeleteRecipe = async (props: IdRecipeType): Promise<RecipeType> => {
    try {
        const { id } = props;
        const existingRecipe = await SelectRecipeById({ id });
        if (!existingRecipe) {
            throw new Error("Recipe does not exist");
        }
        const recipe = await Prisma.recipe.delete({
            where: {
                id,
            },
        });
        console.log("Deleted recipe -> ", recipe, existingRecipe);
        return existingRecipe;
    } catch (error) {
        throw new Error("Unable to delete recipe -> " + (error as Error).message);
    }
};

export const DeleteManyRecipe = async (props: IdRecipeType[]): Promise<RecipeType[]> => {
    try {
        const existingRecipeList: RecipeType[] = [];
        props.map(async ({ id }) => {
            const existingRecipe = await SelectRecipeById({ id });
            if (!existingRecipe) {
                throw new Error("A recipe does not exist");
            }
            existingRecipeList.push(existingRecipe);
        });
        const recipeList = await Prisma.recipe.deleteMany({
            where: {
                id: {
                    in: props.map((recipe) => recipe.id),
                },
            },
        });
        console.log("Deleted recipe list -> ", recipeList, existingRecipeList);
        return existingRecipeList;
    } catch (error) {
        throw new Error("Unable to delete many recipes -> " + (error as Error).message);
    }
};
