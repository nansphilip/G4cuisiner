"use client";

import React, { useEffect, useState } from "react";
import { fetchUserFavorites } from "@actions/database/Favorite";
import Rating from "@comps/server/rating";
import RecipeImageListClient from "@comps/client/recipe-image-list";
import Favorite from "@comps/client/favorite";
import SearchFavoriteClient from "@comps/client/search-favorite";
import { useSession } from "@lib/client";

export default function FavoritesClient() {
    const { data: session } = useSession();
    
    const [favorites, setFavorites] = useState<boolean[]>([]);
    const [filteredFavorites, setFilteredFavorites] = useState<any[]>([]);

    // Chargement des favoris de l'utilisateur connecté
    useEffect(() => {
        const loadFavorites = async () => {
            if (session && session.user) {
                const userFavorites = await fetchUserFavorites(session.user.id);
                setFavorites(userFavorites);
                setFilteredFavorites(userFavorites);
            }
        };

        loadFavorites();
    }, [session]);

    const handleSearch = (query: string) => {
        const filtered = favorites.filter((recipe) => recipe.title.toLowerCase().startsWith(query.toLowerCase()));
        setFilteredFavorites(filtered);
    };

    return (
        <div className="size-full">
            <div className="p-4">
                <SearchFavoriteClient onSearch={handleSearch} />
            </div>
            <div className="flex flex-col gap-2">
                {filteredFavorites.length > 0 ? (
                    filteredFavorites.map((recipe) => (
                        <div
                            key={recipe.id}
                            className="my-4 flex flex-row gap-4 rounded-lg border-2 border-gray-300 p-2 shadow-lg"
                        >
                            {recipe.imageList && recipe.imageList.length > 0 ? (
                                <div className="h-full">
                                    <RecipeImageListClient isFavoritePage={true} imageList={recipe.imageList} />
                                </div>
                            ) : (
                                <div className="h-full">
                                    <span className="text-gray-500">No Image</span>
                                </div>
                            )}
                            <div className="flex grow justify-between font-semibold text-gray-700">
                                <div className="w-full ">
                                    <h1 className="text-xl">{recipe.title}</h1>
                                    <p className="text-xs">{recipe.description}</p>
                                    <div className="flex whitespace-nowrap">
                                        <a
                                            href={`/recipe/${recipe.slug}`}
                                            className="mt-4 block font-bold text-primary hover:underline"
                                        >
                                            Voir la recette
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="self-end">
                                        <Rating
                                            rating={recipe.ratingAverage}
                                            totalRatingAmount={recipe.totalRatingAmount}
                                        />
                                    </div>
                                    <div className="mt-auto self-end whitespace-nowrap">
                                        <Favorite
                                            userFavorite={recipe.userFavorite}
                                            userId={session?.user.id}
                                            recipeId={recipe.id}
                                            totalFavoriteAmount={recipe.totalFavoriteAmount}
                                            classSvg="size-6"
                                        />
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
