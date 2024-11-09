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
import { GetRecipeUser } from "@actions/database/RecipeUser";
import Button from "@comps/client/button";

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
        numberOfServing,
        preparationTime,
        difficultyLevel,
        lunchType,
        lunchStep,
        // userId: recipeUserId,
        // createdAt,
        // updatedAt,
        ingredientList,
        reviewList,
        ratingAverage,
        imageList,
    } = recipe;

    // Get current user session
    const session = await getSession();

    const userRecipe = session && (await GetRecipeUser({ recipeId, userId: session.user.id }));

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
                        <FavoriteCLient userRecipe={userRecipe} />
                    </div>
                    <RatingClient rating={ratingAverage} />
                </div>
                <p>{description}</p>
            </section>
            <RecipeImageListClient imageList={imageList} />
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
            <hr />
            <div className="flex flex-row items-center justify-center">
                <RateRecipeClient userRecipe={userRecipe} />
            </div>
            <AddReviewClient />
            <hr />
            <section>
                <h2 className="text-2xl font-bold">Commentaires</h2>
                <ReviewList reviewList={reviewList} />
            </section>
        </div>
    );
}


const AddReviewClient = () => {
    return (
        <>
            <h3>Rédiger un commentaire</h3>
            <form action="">
                <input type="text" />
                <Button type="submit">Envoyer</Button>
            </form>
        </>
    );
};

type ReviewListProps = {
    reviewList: {
        userId: string;
        name: string;
        rating: number | null;
        favorite: boolean;
        review: string | null
    }[];
};

const ReviewList = (props: ReviewListProps) => {
    const { reviewList } = props;

    return (
        <>
        {reviewList.map((review, index) => (
            <>
            <h3>Rédiger un commentaire</h3>
            <form action=""></form>
            </>
        ))}
        </>
    );
};
