import React from "react";
import FavoritesClient from "@app/(core)/favorites/client";
import { getSession } from "@lib/auth";
import { SelectFavoriteRecipeUser } from "@actions/database/Favorite";
import { redirect } from "next/navigation";

export default async function FavoritesPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const recipeUserFavoriteList = session && (await SelectFavoriteRecipeUser(session.user.id));

    return (
        <div className="h-screen w-full space-y-4">
            <h1 className="text-2xl font-bold">Mes Favoris</h1>
            <FavoritesClient recipeUserFavoriteList={recipeUserFavoriteList} />
        </div>
    );
}
