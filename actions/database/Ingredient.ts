"use server";

import Prisma from "@lib/prisma";
import { ReturnIngredientType } from "@actions/types/Ingredient";

export const SelectEveryIngredient = async (): Promise<ReturnIngredientType[] | null> => {
    try {
        const ingredientList = await Prisma.ingredient.findMany({
            select: {
                id: true,
                name: true,
                image: true,
            },
        });
        if (ingredientList.length === 0) {
            return null;
        }
        return ingredientList;
    } catch (error) {
        throw new Error("SelectEveryIngredient -> " + (error as Error).message);
    }
};
