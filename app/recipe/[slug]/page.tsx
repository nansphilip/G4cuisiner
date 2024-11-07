import React from "react";
import { SelectEveryRecipeSlugs, SelectRecipeBySlug } from "@actions/database/Recipe";
import type { Metadata } from "next";
import { getSession } from "@lib/auth";
import FavoriteCLient from "@comps/client/favorite";
import RatingClient from "@comps/client/recipe-rate";
import RecipeImageListClient from "@comps/server/recipe-image-list";
import QuantityButtonClient from "@comps/client/quantity-button";
import IngredientListClient from "@comps/server/recipe-ingredient-image";
import RateRecipeClient from "@comps/client/rate-a-recipe";

export const metadata: Metadata = {
    title: "Recipe",
    description: "Recipe page.",
};

export async function generateStaticParams() {
    const recipeList = await SelectEveryRecipeSlugs();
    return recipeList.map((recipe) => ({ slug: recipe.slug }));
}

type RecipePageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function RecipePage(props: RecipePageProps) {
    const { params } = props;
    const { slug } = await params;

    const recipe = await SelectRecipeBySlug({ slug });

    if (!recipe) {
        throw new Error("Recipe not found");
    }

    const {
        id: recipeId,
        title,
        // slug: recipeSlug,
        description,
        image,
        numberOfServing,
        preparationTime,
        difficultyLevel,
        lunchType,
        lunchStep,
        // userId: recipeUserId,
        // createdAt,
        // updatedAt,
        ingredientList,
        favorite,
        rating,
    } = recipe;

    // Get current user session
    const session = await getSession();

    // Set the image url list
    const imageUrlList = image ? [image, "/recipes/crepes.webp"] : [];

    // Format data
    const difficultyLevelFormatted =
        (difficultyLevel === "EASY" && "Facile") ||
        (difficultyLevel === "MEDIUM" && "Moyen") ||
        (difficultyLevel === "HARD" && "Difficile");
    const lunchTypeFormatted =
        (lunchType === "BREAKFAST" && "Petit déjeuner") ||
        (lunchType === "BRUNCH" && "Brunch") ||
        (lunchType === "DINNER" && "Dîner") ||
        (lunchType === "LUNCH" && "Déjeuner") ||
        (lunchType === "SNACK" && "Goûter");
    const lunchStepFormatted =
        (lunchStep === "APPETIZER" && "Apéritif") ||
        (lunchStep === "STARTER" && "Entrée") ||
        (lunchStep === "MAIN" && "Plat principal") ||
        (lunchStep === "DESSERT" && "Dessert");

    // Passez les données à votre composant client
    return (
        <div className="mt-2 w-full space-y-5">
            <section className="space-y-1">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex w-full flex-row items-center justify-start gap-4">
                        <h1 className="text-4xl font-bold">{title}</h1>
                        <FavoriteCLient favorite={favorite} sessionUserId={session?.user.id} recipeId={recipeId} />
                    </div>
                    <RatingClient rating={rating} />
                </div>
                <p>{description}</p>
            </section>
            <RecipeImageListClient title={title} imageUrlList={imageUrlList} />
            <section className="space-y-1">
                <h2 className="text-2xl font-bold">Information</h2>
                <div>
                    <p>
                        <span>Préparation : </span>
                        <span className="font-bold">{preparationTime} min</span>
                    </p>
                    <p>
                        <span>Difficulté : </span>
                        <span className="font-bold">{difficultyLevelFormatted}</span>
                    </p>
                    <p>
                        <span>Personnes : </span>
                        <span className="font-bold">{numberOfServing}</span>
                    </p>
                    <p>
                        <span>Type de repas : </span>
                        <span className="font-bold">{lunchTypeFormatted}</span>
                    </p>
                    <p>
                        <span>Etape de repas : </span>
                        <span className="font-bold">{lunchStepFormatted}</span>
                    </p>
                </div>
            </section>
            <section className="space-y-1">
                <h2 className="text-2xl font-bold">Ingredients</h2>
                {ingredientList.map((ingredient, index) => (
                    <div key={index} className="flex flex-row items-center justify-between">
                        <IngredientListClient ingredient={ingredient} />
                        <QuantityButtonClient ingredient={ingredient} />
                    </div>
                ))}
            </section>
            <div>
                <RateRecipeClient recipeId={recipeId} />
            </div>
        </div>
    );
}
