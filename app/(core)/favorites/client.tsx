"use client";

import React, { useState } from "react";
import SearchFavoriteClient from "@comps/client/search-favorite";
import RecipeImageListClient from "@comps/client/image-listing";
import { ReturnFavoriteRecipeUserType } from "@actions/types/Favorite";
import RatingDisplayAverageClient from "@comps/client/rating-display-average";
import Link from "next/link";
import FavoriteDisplayClient from "@comps/client/favorite-display";

type FavoritesClientProps = {
    recipeUserFavoriteList: ReturnFavoriteRecipeUserType[];
};

export default function FavoritesClient(props: FavoritesClientProps) {
    const { recipeUserFavoriteList } = props;

    const [filteredFavorites, setFilteredFavorites] = useState(recipeUserFavoriteList);

    const handleSearch = (query: string) => {
        const filtered = recipeUserFavoriteList.filter((fav) =>
            fav.title.toLowerCase().startsWith(query.toLowerCase())
        );
        setFilteredFavorites(filtered);
    };

    return (
        <div className="space-y-5 pb-4">
            <SearchFavoriteClient onSearch={handleSearch} />
            <div className="flex flex-col gap-4">
                {filteredFavorites.length > 0 ? (
                    filteredFavorites.map((recipe, index) => (
                        <Link
                            href={`/recipe/${recipe.slug}`}
                            key={index}
                            className="flex gap-3 rounded-xl border p-3 shadow-lg"
                        >
                            <RecipeImageListClient imageList={[recipe.imageList[0]]} />
                            <div className="flex w-full flex-col justify-between gap-3">
                                <div>
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="flex flex-row items-center justify-start gap-3">
                                            <div className="text-xl font-bold">{recipe.title}</div>
                                            <RatingDisplayAverageClient
                                                ratingAverage={recipe.ratingAverage}
                                                classSvg="size-6"
                                            />
                                        </div>
                                        <FavoriteDisplayClient
                                            userFavorite={recipe.userFavorite}
                                            classSvg="size-8"
                                        />
                                    </div>
                                    <div className="text-xs">{recipe.description}</div>
                                </div>
                                {recipe.latestReview && (
                                    <div className="flex h-full flex-col justify-between gap-1 rounded-md border p-2">
                                        <div className="text-sm font-bold">Dernier commentaire</div>
                                        <div className="line-clamp-2 text-xs">{recipe.latestReview.review}</div>
                                        <div className="text-xs text-gray-400">
                                            <span>Posté par </span>
                                            <span>{recipe.latestReview.userName}</span>
                                            <span> le </span>
                                            <span>{new Date(recipe.latestReview.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="p-4">
                        <div className="rounded-lg bg-gray-100 p-4 text-center shadow-md">
                            <h2 className="">Aucun favori pour le moment</h2>
                            <p className="p-2">Ajoutez des recettes à vos favoris pour les retrouver facilement ici.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
