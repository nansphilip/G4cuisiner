import React from "react";
import FavoritesClient from "@app/(core)/favorites/client";
import { getSession } from "@lib/auth";
import { SelectRecipeUserFavorite } from "@actions/database/Favorite";
import { redirect } from "next/navigation";

export default async function FavoritesPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const recipeUserFavoriteList = session && (await SelectRecipeUserFavorite(session.user.id));

    console.log(recipeUserFavoriteList);

    return (
        <div className="flex size-full flex-col gap-4">
            <div className="text-2xl font-bold">
                <h1>Mes Favoris</h1>
            </div>
            <FavoritesClient session={session} recipeUserFavoriteList={recipeUserFavoriteList} />
        </div>
    );
};
