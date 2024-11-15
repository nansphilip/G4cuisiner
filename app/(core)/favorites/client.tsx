"use client";

import React, {useEffect, useState} from "react";
import {fetchUserFavorites} from "@actions/database/Favorite";
import SearchFavoriteClient from "@comps/client/search-favorite";
import RecipeImageListClient from "@comps/client/image-listing";
import RatingDisplayAverageClient from "@comps/client/rating-display-average";
import {useSession} from "@lib/client";
import FavoriteAddClient from "@comps/client/favorite-add";


export default function FavoritesClient() {
    const {data: session} = useSession();

    const [favorites, setFavorites] = useState<any[]>([]);
    const [filteredFavorites, setFilteredFavorites] = useState<any[]>([]);


    const loadFavorites = async () => {
        if (session && session.user) {
            const userFavoriteList = session && (await fetchUserFavorites(session.user.id));
            setFavorites(userFavoriteList);
            setFilteredFavorites(userFavoriteList);
        }
    };
    useEffect(() => {
        if (session) {
            loadFavorites();
        }
    }, [session]);


    const handleSearch = (query: string) => {
        const filtered = favorites.filter((fav) =>
            fav.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredFavorites(filtered);
    };

    return (
        <div className="size-full">
            <div className="p-4">
                <SearchFavoriteClient onSearch={handleSearch}/>
            </div>
            <div className="flex flex-col gap-2">
                {filteredFavorites.length > 0 ? (
                    filteredFavorites.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="my-4 flex gap-4 rounded-lg border-2 border-gray-300 p-2 shadow-lg">
                            <div className="h-full">
                                <RecipeImageListClient imageList={[recipe.images[0]]} />
                            </div>
                            <div className="flex text-2xl font-bold">
                                <div>{recipe.title}
                                    <p className="text-xs mt-4">{recipe.description}</p>

                                </div>
                                {/*<FavoriteAddClient*/}
                                {/*    userId={session?.user.id}*/}
                                {/*    userFavorite={userFavorite}*/}
                                {/*    recipeId={recipeId}*/}
                                {/*    totalFavoriteAmount={totalFavoriteAmount}*/}
                                {/*    classSvg="size-10"*/}
                                {/*/>*/}


                                <div className="flex grow justify-between font-semibold text-gray-700">
                                    <div className="flex flex-col items-end">
                                        <div className="self-end">
                                            <RatingDisplayAverageClient
                                                ratingAverage={recipe.ratingAverage}
                                                totalRatingAmount={recipe.totalRatingAmount}
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <a href={`/recipe/${recipe.slug}`}
                                               className="mt-4 block font-bold text-primary hover:underline">
                                                Voir la recette
                                            </a>

                                        </div>
                                    </div>
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
};
