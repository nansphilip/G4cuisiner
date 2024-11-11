import React from "react";
import { SelectEveryRecipeSlugs, SelectRecipeBySlug } from "@actions/database/Recipe";
import type { Metadata } from "next";
import { getSession } from "@lib/auth";
import FavoriteCLient from "@comps/client/favorite";
import RecipeImageListClient from "@comps/client/recipe-image-list";
import RatingClient from "@comps/client/rating";
import { GetFavorite } from "@actions/database/Favorite";
import Rating from "@comps/server/rating";
import RecipeInfo from "@comps/server/recipe-info";
import { combo } from "@lib/combo";
import { GetRating } from "@actions/database/Rating";
import IngredientDisplayClient from "@comps/client/ingredient-display";
import AddReviewClient from "@comps/client/add-review";
import { ThumbsDown, ThumbsUp } from "lucide-react";

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
        description,
        reviewList,
        ratingAverage,
        totalRatingAmount,
        totalFavoriteAmount,
        imageList,
    } = recipe;

    // Get current user session
    const session = await getSession();

    const userFavorite = session && (await GetFavorite({ recipeId: recipe.id, userId: session.user.id }));
    const userRating = session && (await GetRating({ recipeId: recipe.id, userId: session.user.id }));

    return (
        <div className="mt-2 w-full space-y-5">
            <section>
                <div className="flex flex-row items-start justify-between">
                    <div>
                        <div className="flex w-full flex-row items-center justify-start gap-6">
                            <h1 className="text-4xl font-bold">{title}</h1>
                            <FavoriteCLient
                                userFavorite={userFavorite}
                                userId={session?.user.id}
                                recipeId={recipeId}
                                totalFavoriteAmount={totalFavoriteAmount}
                                classSvg="size-10"
                            />
                        </div>
                        <p>{description}</p>
                    </div>
                    <Rating rating={ratingAverage} totalRatingAmount={totalRatingAmount} classSvg="size-11" />
                </div>
            </section>
            <RecipeImageListClient imageList={imageList} />
            <hr />
            <section className="space-y-1">
                <h2 className="text-2xl font-bold">Information</h2>
                <RecipeInfo recipe={recipe} />
            </section>
            <hr />
            <section className="space-y-1">
                <h2 className="text-2xl font-bold">Ingredients</h2>
                <IngredientDisplayClient recipe={recipe} />
            </section>
            <hr />
            <section>
                <h3>Instructions</h3>
                <p>Insert markdown</p>
            </section>
            <hr />
            <section className="space-y-1">
                <h2 className="text-2xl font-bold">Mon avis</h2>
                <p>Noter la recette</p>
                <RatingClient
                    userId={session?.user.id}
                    recipeId={recipeId}
                    userRating={userRating}
                    classDiv="justify-center"
                    classSvg="size-12"
                />
                <AddReviewClient userId={session?.user.id} recipeId={recipeId} />
            </section>
            <hr />
            <section className="space-y-2">
                <h2 className="text-2xl font-bold">Commentaires</h2>
                <ReviewList reviewList={reviewList} />
            </section>
        </div>
    );
}

type ReviewListProps = {
    reviewList: {
        userId: string;
        name: string;
        rating: number | null;
        review: string;
        thumbsPositive: number;
        thumbsNegative: number;
        createdAt: Date;
    }[];
    classDiv?: string;
    classCom?: string;
};

const ReviewList = (props: ReviewListProps) => {
    const { reviewList, classDiv, classCom } = props;

    return (
        <div className={combo("space-y-2", classDiv)}>
            {reviewList.map(({ name, review, rating, userId, thumbsPositive, thumbsNegative, createdAt }) => {
                const formattedDate = new Date(createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });
                const formattedTime = new Date(createdAt).toLocaleTimeString("fr-FR", {
                    hour: "numeric",
                    minute: "numeric",
                });
                return (
                    <div key={userId} className={combo("border rounded-md py-2 px-4", classCom)}>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-3">
                                <h3 className="font-bold">{name}</h3>
                                <Rating counter={false} rating={rating} />
                                <div className="flex flex-row gap-2">
                                    <span>{formattedTime}</span>
                                    <span className="font-bold">•</span>
                                    <span>{formattedDate}</span>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2">
                                <button className="flex w-fit flex-row items-center justify-center gap-2 rounded-full border-1.5 px-3 py-0.5 text-gray-500 transition-all duration-150 hover:border-blue-500 hover:text-blue-700">
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <ThumbsUp className="size-4" />
                                        <span>{thumbsPositive}</span>
                                    </div>
                                </button>
                                <button className="flex w-fit flex-row items-center justify-center gap-2 rounded-full border-1.5 px-3 py-0.5 text-gray-500 transition-all duration-150 hover:border-gray-500 hover:text-gray-700">
                                    <ThumbsDown className="size-4" />
                                    <span>{thumbsNegative}</span>
                                </button>
                            </div>
                        </div>
                        <p>{review}</p>
                    </div>
                );
            })}
        </div>
    );
};
