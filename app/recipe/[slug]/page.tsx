import React from "react";
import { SelectRecipeBySlug } from "@actions/database/Recipe";
import type { Metadata } from "next";
import { getSession } from "@lib/auth";
import RecipeImageListClient from "@comps/client/image-listing";
import { SelectFavorite } from "@actions/database/Favorite";
import RecipeInfo from "@comps/server/recipe-info";
import { SelectRating } from "@actions/database/Rating";
import IngredientDisplayClient from "@comps/client/ingredient-display";
import { SelectReviewThumb } from "@actions/database/Review";
import ReviewDisplayClient from "@comps/client/review-display";
import ReviewAddClient from "@comps/client/review-add";
import FavoriteAddClient from "@comps/client/favorite-add";
import RatingAddClient from "@comps/client/rating-add";
import RatingDisplayAverageClient from "@comps/client/rating-display-average";
import { SelectUserById } from "@actions/database/User";
import StepsInfo from "@comps/server/steps-info";

export const metadata: Metadata = {
    title: "Recipe",
    description: "Recipe page.",
};

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

    const userFavorite = (session && (await SelectFavorite({ recipeId, userId: session.user.id }))?.favorite) ?? null;
    const userRating = (session && (await SelectRating({ recipeId, userId: session.user.id }))?.rating) ?? null;
    const userThumbs =
        session &&
        (await SelectReviewThumb({
            reviewIdList: reviewList.map(({ reviewId }) => reviewId),
            userId: session.user.id,
        }));

    const user = session ? await SelectUserById({ userId: session.user.id }) : null;
    // const userRole = user ? user.role : null;
    const isUserRestricted = user ? user.restricted : null;

    return (
        <div className="mt-2 w-full space-y-5">
            <section>
                <div className="flex flex-row flex-wrap gap-1 items-start justify-between">
                    <div>
                        <div className="w-full flex flex-row items-center justify-start gap-6">
                            <h1 className="text-4xl font-bold">{title}</h1>
                            <FavoriteAddClient
                                userId={session?.user.id}
                                userFavorite={userFavorite}
                                recipeId={recipeId}
                                totalFavoriteAmount={totalFavoriteAmount}
                                classSvg="size-11"
                            />
                        </div>
                        <p>{description}</p>
                    </div>
                    <RatingDisplayAverageClient
                        ratingAverage={ratingAverage}
                        totalRatingAmount={totalRatingAmount}
                        classSvg="size-11"
                    />
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
                <h2 className="text-2xl font-bold">Instructions</h2>
                <StepsInfo recipe={recipe} />
            </section>
            <hr />
            <section className="space-y-1">
                <h2 className="text-2xl font-bold">Mon avis</h2>
                <p>Noter la recette</p>
                <RatingAddClient
                    userId={session?.user.id}
                    recipeId={recipeId}
                    userRating={userRating}
                    classDiv="justify-center"
                    classSvg="size-12"
                />
            </section>
            <hr />
            <section className="space-y-2">
                <h2 className="text-2xl font-bold">Commentaires</h2>
                {isUserRestricted ? (
                    <p className="w-full text-center italic">Vous avez été restreint, vous ne pouvez pas commenter.</p>
                ) : (
                    <ReviewAddClient userRating={userRating} recipeId={recipeId} />
                )}
                <p>Commentaires des cuisiniers</p>
                <ReviewDisplayClient
                    userId={session?.user.id}
                    userName={session?.user.name}
                    userThumbs={userThumbs}
                    reviewList={reviewList}
                />
            </section>
        </div>
    );
}
