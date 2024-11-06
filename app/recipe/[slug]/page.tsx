import React from "react";
import { SelectEveryRecipeSlugs, SelectRecipeBySlug } from "@actions/database/Recipe";
import type { Metadata } from "next";
import { getSession } from "@lib/auth";
import FavoriteCLient from "@comps/client/favorite";
import RatingClient from "@comps/client/rating-recipe";
import { SelectFavoriteByUserId } from "@actions/database/Favorite";
import RecipeCard from "@comps/server/recipe-card";

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
        slug: recipeSlug,
        description,
        image,
        numberOfServing,
        preparationTime,
        difficultyLevel,
        lunchType,
        lunchStep,
        userId: recipeUserId,
        createdAt,
        updatedAt,
        ingredients,
    } = recipe;

    // Get current user session
    const session = await getSession();

    // Check if the recipe is in the user's favorite list
    const favoritesUserList = session ? await SelectFavoriteByUserId({ id: session.user.id }) : null;

    // Passez les données à votre composant client
    return (
        <div className="flex w-full flex-col items-baseline gap-8">
            <div className="flex w-full flex-row items-center justify-between">
                <h1 className="flex text-5xl font-bold">{title}</h1>
                <FavoriteCLient
                    sessionUserId={session?.user.id}
                    recipeId={recipeId}
                    favoritesUserList={favoritesUserList}
                />
            </div>
            <div>
                <span className="flex text-2xl font-bold">Temps de préparation : {preparationTime} min</span>
                <span className="flex text-2xl font-bold">Difficulté : {difficultyLevel}</span>
                <span className="flex text-2xl font-bold">Nombre de personnes : {numberOfServing}</span>
                <span className="flex text-2xl font-bold">Type de repas : {lunchType}</span>
                <span className="flex text-2xl font-bold">Etape de repas : {lunchStep}</span>
                <RatingClient rating={2} />
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                <RecipeCard title={title} image={image} />
            </div>
            <div>
                {/* <QuantityButton initialQuantity={ingredients} onChange={handleQuantityChange} />{" "} */}
                {/* Utilisation du bouton de quantité */}
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                {/* <IngredientList ingredients={ingredients} /> */}
            </div>
            <div className="flex w-full rounded border">
                <h2 className="font-bold">Description :</h2>
                <p>{description}</p>
            </div>
            <div className="">{/* <RecipeSteps steps={steps} /> */}</div>
            <div>{/* <Rating rating={rating} onRate={handleRating} /> */}</div>
        </div>
    );
}
