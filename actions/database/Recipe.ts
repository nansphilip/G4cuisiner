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
} from "@actions/types/Recipe";

/**
 * Creates a new recipe.
 *
 * @param {CreateRecipeType} props - The properties of the recipe to create.
 * @returns {Promise<RecipeType>} - The created recipe.
 * @throws {Error} - If the recipe already exists or if there is an error during creation.
 */
export const CreateRecipe = async (props: CreateRecipeType): Promise<RecipeType> => {
    try {
        const { title, description, image, userId, preparationTime } = props;

        // Check if recipe already exists
        const existingRecipe = await SelectRecipeByTitle({ title });
        if (existingRecipe) {
            throw new Error("Recipe already exists");
        }

        // Create recipe
        const recipe = await Prisma.recipe.create({
            data: {
                title,
                slug: title
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-"),
                description,
                image,
                userId,
                preparationTime,
            },
        });
        console.log("Created recipe -> ", recipe);
        return recipe;
    } catch (error) {
        throw new Error("Unable to create recipe -> " + (error as Error).message);
    }
};

/**
 * Selects a recipe by its ID.
 *
 * @param {IdRecipeType} props - The ID of the recipe to select.
 * @returns {Promise<RecipeType | null>} - The selected recipe or null if not found.
 * @throws {Error} - If there is an error during selection.
 */
export const SelectRecipeById = async (props: IdRecipeType): Promise<RecipeType | null> => {
    try {
        const { id } = props;
        const recipe = await Prisma.recipe.findUnique({
            where: {
                id,
            },
        });
        // console.log("Selected recipe -> ", recipe);
        if (!recipe) {
            return null;
        }
        return recipe;
    } catch (error) {
        throw new Error("Unable to select recipe -> " + (error as Error).message);
    }
};

/**
 * Selects a recipe by its title.
 *
 * @param {TitleRecipeType} props - The title of the recipe to select.
 * @returns {Promise<RecipeType | null>} - The selected recipe or null if not found.
 * @throws {Error} - If there is an error during selection.
 */
export const SelectRecipeByTitle = async (props: TitleRecipeType): Promise<RecipeType | null> => {
    try {
        const { title } = props;
        const recipe = await Prisma.recipe.findUnique({
            where: {
                title,
            },
        });
        // console.log("Selected recipe -> ", recipe);
        if (!recipe) {
            return null;
        }
        return recipe;
    } catch (error) {
        throw new Error("Unable to select recipe -> " + (error as Error).message);
    }
};

/**
 * Selects a recipe by its slug.
 *
 * @param {SlugRecipeType} props - The slug of the recipe to select.
 * @returns {Promise<RecipeType | null>} - The selected recipe or null if not found.
 * @throws {Error} - If there is an error during selection.
 */
export const SelectRecipeBySlug = async (props: SlugRecipeType): Promise<RecipeType | null> => {
    try {
        const { slug } = props;
        const recipe = await Prisma.recipe.findUnique({
            where: {
                slug,
            },
        });
        console.log("Selected recipe -> ", recipe);
        if (!recipe) {
            return null;
        }
        return recipe;
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
        // console.log("Selected every recipe slugs -> ", recipeList);
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
        // console.log("Selected every recipes -> ", recipeList);
        if (!recipeList) {
            throw new Error("No recipe found");
        }
        return recipeList;
    } catch (error) {
        throw new Error("Unable to select many recipes -> " + (error as Error).message);
    }
};

/**
 * Updates a recipe by its ID.
 *
 * @param {RecipeType} props - The properties of the recipe to update.
 * @returns {Promise<RecipeType>} - The updated recipe.
 * @throws {Error} - If the recipe does not exist or if there is an error during update.
 */
export const UpdateRecipeById = async (props: UpdateRecipeType): Promise<RecipeType> => {
    try {
        const { id, title, description, image, userId } = props;

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

        const recipe = await Prisma.recipe.update({
            where: {
                id,
            },
            data: {
                title,
                slug: title
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, "-"),
                description,
                image,
                userId,
            },
        });
        console.log("Updated recipe -> ", recipe);
        return recipe;
    } catch (error) {
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};

/**
 * Deletes a recipe by its ID.
 *
 * @param {IdRecipeType} props - The ID of the recipe to delete.
 * @returns {Promise<RecipeType>} - The deleted recipe.
 * @throws {Error} - If the recipe does not exist or if there is an error during deletion.
 */
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

/**
 * Deletes multiple recipes by their IDs.
 *
 * @param {IdRecipeType[]} props - The list of IDs of the recipes to delete.
 * @returns {Promise<RecipeType[]>} - The list of deleted recipes.
 * @throws {Error} - If any of the recipes do not exist or if there is an error during deletion.
 */
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

export const LunchTypeList = async () => {
    try {
        const lunchTypeListed = await Prisma.lunchType.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        if (!lunchTypeListed) {
            throw new Error("No type found");
        }
        return lunchTypeListed;
    } catch (error) {
        throw new Error("Unable to select any type lunch -> " + (error as Error).message);
    }
};

export const LunchStepList = async () => {
    try {
        const lunchStepListed = await Prisma.lunchStep.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        if (!lunchStepListed) {
            throw new Error("No type found");
        }
        return lunchStepListed;
    } catch (error) {
        throw new Error("Unable to select any step's lunch -> " + (error as Error).message);
    }
};

export const IngredientList = async () => {
    try {
        const ingredientListed = await Prisma.ingredient.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        if (!ingredientListed) {
            throw new Error("No type found");
        }
        return ingredientListed;
    } catch (error) {
        throw new Error("Unable to select any ingredients -> " + (error as Error).message);
    }
};
