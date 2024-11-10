import React from "react";
import { SelectEveryRecipeSlugs, SelectRecipeBySlug } from "@actions/database/Recipe";
import type { Metadata } from "next";
import { getSession } from "@lib/auth";
import FavoriteCLient from "@comps/client/favorite";
import RecipeImageListClient from "@comps/server/recipe-image-list";
import QuantityButtonClient from "@comps/client/quantity-button";
import IngredientListClient from "@comps/server/recipe-ingredient-image";
import RatingClient from "@comps/client/rating";
import { GetRecipeUser } from "@actions/database/Favorite";
import Button from "@comps/client/button";
import Rating from "@comps/server/rating";
import RecipeInfo from "@comps/server/recipe-info";
import { combo } from "@lib/combo";

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
        title,
        description,
        numberOfServing,
        ingredientList,
        reviewList,
        ratingAverage,
        totalFavoriteAmount,
        imageList,
    } = recipe;

    // Get current user session
    const session = await getSession();

    const userRecipe = session && (await GetRecipeUser({ recipeId: recipe.id, userId: session.user.id }));

    return (
        <div className="mt-2 w-full space-y-5">
            <section className="space-y-1">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex w-full flex-row items-center justify-start gap-4">
                        <h1 className="text-4xl font-bold">{title}</h1>
                        <FavoriteCLient userRecipe={userRecipe} classSvg="size-10" />
                        <p>Total favorite : {totalFavoriteAmount}</p>
                    </div>
                    <Rating rating={ratingAverage} classSvg="size-10" />
                </div>
                <p>{description}</p>
                <RecipeImageListClient imageList={imageList} />
            </section>
            <hr />
            <section className="space-y-1">
                <h2 className="text-2xl font-bold">Information</h2>
                <RecipeInfo recipe={recipe} />
            </section>
            <hr />
            <section className="space-y-1">
                <h2 className="text-2xl font-bold">Ingredients</h2>
                <p>
                    <span>Personnes : </span>
                    <span className="font-bold">{numberOfServing}</span>
                </p>
                {ingredientList.map((ingredient, index) => (
                    <div key={index} className="flex flex-row items-center justify-between">
                        <IngredientListClient ingredient={ingredient} />
                        <QuantityButtonClient ingredient={ingredient} />
                    </div>
                ))}
            </section>
            <hr />
            <section>
                <h2 className="text-2xl font-bold">Noter</h2>
                <RatingClient userRecipe={userRecipe} classDiv="justify-center" classSvg="size-12" />
                <h2 className="text-2xl font-bold">Commenter</h2>
                <AddReviewClient />
            </section>
            <hr />
            <section className="space-y-2">
                <h2 className="text-2xl font-bold">Commentaires</h2>
                <ReviewList reviewList={reviewList} />
            </section>
        </div>
    );
}

const AddReviewClient = () => {
    return (
        <form action="">
            <label className="flex w-full flex-col gap-1">
                Écrire un commentaire
                <input
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="review"
                    type="text"
                    required
                />
            </label>
            <Button type="submit">Envoyer</Button>
        </form>
    );
};

type ReviewListProps = {
    reviewList: {
        userId: string;
        name: string;
        rating: number | null;
        review: string;
        thumbsPositive: number;
        thumbsNegative: number;
    }[];
    classDiv?: string;
    classCom?: string;
};

const ReviewList = (props: ReviewListProps) => {
    const { reviewList, classDiv, classCom } = props;

    return (
        <div className={combo("space-y-2", classDiv)}>
            {reviewList.map(({ name, review, rating, userId }) => (
                <div key={userId} className={combo("border rounded-md p-2", classCom)}>
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="font-bold">{name}</h3>
                        <Rating rating={rating} />
                    </div>
                    <p>{review}</p>
                </div>
            ))}
        </div>
    );
};
