"use server";

import { RecipeSteps } from "@actions/types/RecipeStep";
import {SlugRecipeType} from "@actions/types/Recipe";
import Prisma from "@lib/prisma";


export const RecipeWithSteps = async (props: SlugRecipeType): Promise<RecipeSteps[] | null> => {
    try {
        const {slug} = props;
        const recipeWithSteps = await Prisma.recipe.findUnique({
            where: { slug },
            include: {
                RecipeSteps: true,
            },
        });
        return recipeWithSteps?.RecipeSteps || null;
    } catch (error) {
        throw new Error("Unable to select recipe -> " + (error as Error).message);
    }
};

