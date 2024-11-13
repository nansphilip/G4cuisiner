"use client";

import {useSession} from "@lib/client";
import Button from "@comps/client/button";
import Loader from "@comps/server/loader";
import {fetchUserFavorites} from "@actions/database/Favorite";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import RecipeImageListClient from "@comps/client/recipe-image-list";
import FavoriteCLient from "@comps/client/favorite";
import {selectRecipesByCreateDate} from "@actions/database/Recipe";

export default function HomeClient() {
    const {data: session, isPending, isRefetching} = useSession();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [recentRecipes, setRecentRecipes] = useState<any[]>([]);

    useEffect(() => {
        const loadRecentRecipes = async () => {
            const recipes = await selectRecipesByCreateDate(3);
            setRecentRecipes(recipes);
        };

        loadRecentRecipes();
    }, []);

    useEffect(() => {
        const loadFavorites = async () => {
            if (session && session.user) {
                const userFavorites = await fetchUserFavorites(session.user.id);
                setFavorites(userFavorites);
            }
        };

        if (session) {
            loadFavorites();
        }
    }, [session]);

    if (isPending || isRefetching) {
        return <Loader/>;
    }

    return session ? (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-20">
                {favorites.length > 0 ? (
                    favorites.map((recipe) => (
                        <div key={recipe.id}
                             className="card p-4 rounded-lg bg-tertiary bg-opacity-20 shadow-md hover:shadow-lg transition-all duration-150 border border-tertiary flex flex-col h-full">
                            <div className="text-white font-bold text-2xl">
                                {recipe.title}
                                <FavoriteCLient
                                    userFavorite={{
                                        favorite: recipe.isFavorite || false,
                                    }}
                                    userId={session.user.id}
                                    recipeId={recipe.id}
                                    totalFavoriteAmount={recipe.totalFavorites}
                                    classSvg="size-10"
                                />
                            </div>
                            <div className="relative w-full">
                                <RecipeImageListClient isHomePage={true} imageList={recipe.images || []}/>
                            </div>
                            <div className="w-full mt-2">
                                {/*<p className="text-s m-2 w-full">{recipe.description}</p>*/}
                            </div>
                            <div className="flex flex-col justify-between items-center mt-2">
                                <Link href={`/recipe/${recipe.slug}`}>
                                    <Button size="sm" variant="flat"
                                            className="bg-primary bg-opacity-75 text-white bold border font-bold z-20">
                                        Voir la recette
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <span>Vous n'avez pas encore de recette favorite.</span>
                )}
            </div>

            <div className="flex justify-center items-center mb-4">
                <Button type="link" href="/logout" variant="outline">
                    Logout
                </Button>
            </div>
        </>
    ) : (
        <>
            <h2 className="text-2xl font-bold mb-4">Recettes récentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-20">
                    {recentRecipes.length > 0 ? (
                        recentRecipes.map((recipe) => (
                            <div key={recipe.id}
                                 className="card p-4 rounded-lg bg-tertiary bg-opacity-20 shadow-md hover:shadow-lg transition-all duration-150 border border-tertiary flex flex-col h-full">
                                {/*<div className="relative w-full">*/}
                                {/*    <RecipeImageListClient isHomePage={true} imageList={recipe.images || []}/>*/}
                                {/*</div>*/}
                                <div className="relative w-64 h-40"> {/* Conteneur plus petit */}
                                    <img
                                        src="/template.webp"
                                        alt="Template Image"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                                <div className="flex flex-col justify-between items-center mt-2">
                                    <Link href={`/recipe/${recipe.slug}`}>
                                        <Button size="sm" variant="flat"
                                                className="bg-primary bg-opacity-75 text-white bold border font-bold z-20">
                                            Voir la recette
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <span>Pas de recettes récentes disponibles.</span>
                    )}
            </div>


            <div className="flex flex-row gap-2 justify-center">
                <Button type="link" href="/register" variant="outline">
                    Register
                </Button>
                <Button type="link" href="/login">
                    Login
                </Button>
            </div>
        </>
    );
}