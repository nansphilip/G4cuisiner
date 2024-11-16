"use client";

import React, { useState } from "react";
import SearchFavoriteClient from "@comps/client/search-favorite";
import RecipeImageListClient from "@comps/client/image-listing";
import { ReturnFavoriteRecipeUserType } from "@actions/types/Favorite";
import FavoriteAddClient from "@comps/client/favorite-add";
import { BetterSessionServer } from "@lib/auth";
import Button from "@comps/server/button";
import RatingDisplayAverageClient from "@comps/client/rating-display-average";

type FavoritesClientProps = {
    recipeUserFavoriteList: ReturnFavoriteRecipeUserType[];
    session: BetterSessionServer;
};

export default function FavoritesClient(props: FavoritesClientProps) {
    const { recipeUserFavoriteList, session } = props;

    const [filteredFavorites, setFilteredFavorites] = useState(recipeUserFavoriteList);

    const handleSearch = (query: string) => {
        const filtered = recipeUserFavoriteList.filter((fav) => fav.title.toLowerCase().startsWith(query.toLowerCase()));
        setFilteredFavorites(filtered);
    };

    return (
        <div className="space-y-5 pb-4">
            <SearchFavoriteClient onSearch={handleSearch} />
            <div className="flex flex-col gap-4">
                {filteredFavorites.length > 0 ? (
                    filteredFavorites.map((recipe, index) => (
                        <div key={index} className="flex gap-3 rounded-xl border p-3 shadow-lg">
                            <div className="h-full">
                                <RecipeImageListClient imageList={[recipe.imageList[0]]} />
                            </div>
                            <div className="flex w-full flex-row justify-between text-2xl">
                                <div className="flex flex-col">
                                    <div className="flex flex-row">
                                        <span className="font-bold">{recipe.title}</span>
                                        <RatingDisplayAverageClient
                                            totalRatingAmount={recipe.totalRatingAmount}
                                            ratingAverage={recipe.ratingAverage}
                                            classDiv="flex flex-row"
                                        />
                                    </div>
                                    <span className="text-xs">{recipe.description}</span>
                                </div>
                                <div className="flex flex-col items-end justify-between">
                                    <FavoriteAddClient
                                        userId={session?.user.id}
                                        userFavorite={recipe.userFavorite}
                                        recipeId={recipe.recipeId}
                                        totalFavoriteAmount={recipe.totalFavoriteAmount}
                                        classSvg="size-10"
                                    />
                                    <Button className="bg-primary hover:bg-orange-300 text-tertiary font-bold shadow-md" type="link" href={`/recipe/${recipe.slug}`}>
                                        Voir la recette
                                    </Button>
                                </div>
                            </div>
                        </div>
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
