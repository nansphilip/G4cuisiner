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
    RecipeFilterType,
} from "@actions/types/Recipe";
import { LunchStep, LunchType } from "@prisma/client";

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
            Steps,
            userId,
            imageList,
            ingredientList,
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
            .replace(/æ/g, "ae")
            .replace(/ç/g, "c")
            .replace(/'/g, "-")
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
                Steps,
                userId,
                Image: {
                    create: imageList.map(({ url, alt }) => ({
                        url,
                        alt,
                    })),
                },
                Quantity: {
                    create: ingredientList.map(({ quantity, unit, ingredientId }) => ({
                        quantity,
                        unit,
                        ingredientId,
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
                status: "APPROVED"
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
                status: "APPROVED"
            },
            include: {
                Image: {
                    select: {
                        url: true,
                        alt: true,
                    },
                },
                Favorite: {
                    select: {
                        favorite: true,
                    },
                },
                Review: {
                    select: {
                        id: true,
                        userId: true,
                        review: true,
                        User: {
                            select: {
                                id: true,
                                name: true,
                                Rating: {
                                    select: {
                                        rating: true,
                                    },
                                    where: {
                                        Recipe: {
                                            slug,
                                        },
                                    },
                                },
                            },
                        },
                        thumbsPositive: {
                            select: {
                                id: true,
                            },
                        },
                        thumbsNegative: {
                            select: {
                                id: true,
                            },
                        },
                        createdAt: true,
                    },
                },
                Rating: {
                    select: {
                        rating: true,
                    },
                },
                Quantity: {
                    select: {
                        quantity: true,
                        unit: true,
                        ingredientId: true,
                        ingredient: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        });
        if (!recipe) {
            return null;
        }

        // Calculate average rating
        const notNullRatingList = recipe.Rating.map(({ rating }) => rating).filter((rating) => rating !== null); // TODO : check if correct
        const ratingAverage =
            Math.trunc((notNullRatingList.reduce((acc, rate) => acc + rate, 0) / notNullRatingList.length) * 100) / 100;

        // Calculate total favorite amount
        const totalFavoriteAmount = recipe.Favorite.filter(({ favorite }) => favorite).length;
        const totalRatingAmount = recipe.Rating.length;

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
            Steps: recipe.Steps,
            status: recipe.status,
            userId: recipe.userId,

            createdAt: recipe.createdAt,
            updatedAt: recipe.updatedAt,

            ratingAverage,
            totalFavoriteAmount,
            totalRatingAmount,

            imageList: recipe.Image,

            reviewList: recipe.Review.map(
                ({ id, userId, User, review, thumbsPositive, thumbsNegative, createdAt }) => ({
                    reviewId: id,
                    userId: userId,
                    name: User.name,
                    rating: User.Rating?.[0]?.rating, // TODO : check if correct
                    review: review,
                    thumbsPositive: thumbsPositive.length,
                    thumbsNegative: thumbsNegative.length,
                    createdAt: createdAt,
                })
            ),

            ingredientList: recipe.Quantity.map(({ ingredientId, ingredient, quantity, unit }) => ({
                ingredientId: ingredientId,
                name: ingredient.name,
                description: ingredient.description,
                image: ingredient.image,
                quantity: quantity,
                unit: unit,
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
            where: {
                status: "APPROVED"
            },
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

export const getRecipesToFilter = async (): Promise<RecipeFilterType[]> => {
    const recipeListRaw = await Prisma.recipe.findMany({
        where: {
            status: "APPROVED"
        },
        select: {
            title: true,
            slug: true,
            lunchStep: true,
            lunchType: true,
            preparationTime: true,
            difficultyLevel: true,
            Image: {
                select: {
                    url: true,
                    alt: true,
                },
            },
        },
    });
    const recipeList = recipeListRaw.map(
        ({ title, slug, lunchStep, lunchType, preparationTime, difficultyLevel, Image }) => ({
            title,
            preparationTime,
            difficultyLevel,
            lunchType,
            lunchStep,
            slug,
            url: Image[0].url,
            alt: Image[0].alt,
        })
    );
    return recipeList;
};

export const UpdateRecipeById = async (props: UpdateRecipeType): Promise<RecipeType> => {
    try {
        const { id, title, description, imageList, ingredientList, userId } = props;
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
            .replace(/æ/g, "ae")
            .replace(/ç/g, "c")
            .replace(/'/g, "-")
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
                Image: {
                    create: imageList.map(({ url, alt }) => ({
                        url,
                        alt,
                    })),
                },
                Quantity: {
                    create: ingredientList.map(({ quantity, unit, ingredientId }) => ({
                        quantity,
                        unit,
                        ingredientId,
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
        await Prisma.recipe.delete({
            where: {
                id,
            },
        });
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
        await Prisma.recipe.deleteMany({
            where: {
                id: {
                    in: props.map((recipe) => recipe.id),
                },
            },
        });
        return existingRecipeList;
    } catch (error) {
        throw new Error("Unable to delete many recipes -> " + (error as Error).message);
    }
};

export type RecipeFilterFormType = {
    id: string;
    slug: string;
    description: string;
    imageUrl: string | null;
    ratingAverage: number; // L'image peut être null si aucune image n'est associée
};

export const getRecipeByFilter = async (
    lunchTypes: LunchType[],
    lunchStep: LunchStep[],
    preparationTime: number
): Promise<RecipeFilterFormType[]> => {
    const recipes = await Prisma.recipe.findMany({
        where: {
            lunchType: {
                in: lunchTypes, // Filtrer par plusieurs valeurs
            },
            lunchStep: {
                in: lunchStep,
            },
            ...(preparationTime !== undefined && {
                preparationTime: {
                    lte: preparationTime, // Filtrer par `preparationTime`
                },
            }),
            status: "APPROVED"
        },
        select: {
            id: true,
            slug: true,
            description: true,
            Image: {
                select: {
                    url: true,
                },
                take: 1,
            },
            Rating: {
                select: {
                    rating: true,
                },
            },
        },
    });

    // Calculate average rating
    // Transformez les résultats pour inclure uniquement la première URL d'image
    return recipes.map((recipe) => {
        const notNullRatingList = recipe.Rating.map(({ rating }) => rating).filter((rating) => rating !== null); // TODO : check if correct
        const ratingAverage =
            Math.trunc((notNullRatingList.reduce((acc, rate) => acc + rate, 0) / notNullRatingList.length) * 100) / 100;
        return {
            id: recipe.id,
            slug: recipe.slug,
            description: recipe.description,
            imageUrl: recipe.Image?.[0]?.url || null,
            ratingAverage, // Utilise null si aucune image n'est associée
        };
    });
};

export async function selectRecipesByCreateDate(limit: number = 3) {
    const recipesByDate = await Prisma.recipe.findMany({
        where: {
            status: "APPROVED"
        },
        orderBy: {
            createdAt: "desc",
        },
        take: limit,
        include: {
            Image: true,
        },
    });

    const recipes = recipesByDate.map((recipe) => ({
        ...recipe,
        images: recipe.Image,
    }));

    return recipes;
}

// actions/database/Recipe.ts
export const UpdateRecipeStatus = async ({ recipeId, status }: { recipeId: string; status: "APPROVED" | "REJECTED" }): Promise<boolean> => {
    try {
        await Prisma.recipe.update({
            where: { id: recipeId },
            data: { status },
        });
        return true;
    } catch (error) {
        throw new Error("Unable to update recipe status -> " + (error as Error).message);
    }
};


export const SelectPendingRecipes = async () => {
    try {
        // Récupérer toutes les recettes avec le statut PENDING
        const pendingRecipes = await Prisma.recipe.findMany({
            where: {
                status: "PENDING", // Seulement les recettes en attente
            },
            // include: {
            //     // Inclure les relations associées si nécessaire (par exemple les images ou ingrédients)
            //     Image: true,
            //     Favorite: true,
            //     Review: true,
            //     Rating: true,
            //     Quantity: true,
            // },
        });

        return pendingRecipes;
    } catch (error) {
        throw new Error("Unable to fetch pending recipes -> " + (error as Error).message);
    }
};