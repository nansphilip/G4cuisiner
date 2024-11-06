import React from "react";
import {SelectEveryRecipeSlugs, SelectRecipeBySlug} from "@actions/database/Recipe";
import {SelectIngredientBySlug} from "@actions/database/Recipe_ingredients";
import { RecipeWithSteps } from "@actions/database/RecipeStep";
import RecipeClient from "./client";
import type {Metadata} from "next"
import {getSession} from "@lib/auth";

export const metadata: Metadata = {
    title: "Recipe",
    description: "Recipe page.",
};

export async function generateStaticParams() {
    const recipeList = await SelectEveryRecipeSlugs();

    return recipeList.map((recipe) => ({slug: recipe.slug}));
}

type RecipePageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
    const { slug } = await params;

    const session = await getSession();

    const recipe = await SelectRecipeBySlug({ slug });
    const ingredientDetails = await SelectIngredientBySlug({ slug });
    const recipeSteps = await RecipeWithSteps({ slug });

    if (!recipe) {
        throw new Error("Recipe not found");
    }

    // Passez les données à votre composant client
    return (
        <RecipeClient
            recipe={{ ...recipe, steps: recipeSteps || [] }}
            ingredients={ingredientDetails}
            userId={session?.user.id}
        />
    );
}