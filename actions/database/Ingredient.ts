"use server";

import { IngredientCreateRecipe } from "@actions/types/Ingredient";
import Prisma from "@lib/prisma";

export const selectAllIngredients = async (): Promise<IngredientCreateRecipe[]> => {
    try {
        const ingredientList = await Prisma.ingredient.findMany({
            select: {
                id: true,
                name: true,
                image: true,
            },
        });
        return ingredientList;
    } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients:", error);
        throw error;
    }
};
