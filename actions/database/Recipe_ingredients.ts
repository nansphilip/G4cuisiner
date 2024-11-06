"use server";

import {SlugRecipeType} from "@actions/types/Recipe";
import {IngredientType} from "@actions/types/Ingredient";
import Prisma from "@lib/prisma";

export const SelectIngredientBySlug = async (props: SlugRecipeType): Promise<IngredientType[] | null> => {
    try {
        const {slug} = props;
        const ingredients = await Prisma.recipe_ingredients.findMany({
            where: {
                slugRecipe: slug,  // Filtre sur le slug de la recette
            },
            include: {
                ingredient: true, // Inclut les détails de l'ingrédient
            },
        });

        if (ingredients.length === 0) {
            return null;
        }

        return ingredients.map(item => ({
            ...item.ingredient, // Inclut tous les détails de l'ingrédient
            ingredientQuantity: item.ingredientQuantity // Ajoute la quantité de l'ingrédient
        }));
    } catch (error) {
        throw new Error("Unable to select ingredients -> " + (error as Error).message);
    }
};
