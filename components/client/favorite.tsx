"use client";

import { AddFavorite, RemoveFavorite } from "@actions/database/Favorite";
import { FavoriteType } from "@actions/types/Favorite";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type FavoriteProps = {
    recipeId: string;
    sessionUserId: string | undefined;
    favoritesUserList: FavoriteType[] | null;
};

export default function FavoriteCLient(props: FavoriteProps) {
    const { recipeId, sessionUserId, favoritesUserList } = props;

    const router = useRouter();

    const isRecipeInFavorite = favoritesUserList
        ? favoritesUserList.some((favorite) => favorite.id === recipeId)
        : false;

    const [isFavorite, setIsFavorite] = useState<boolean>(isRecipeInFavorite);

    const toggleFavorite = async () => {
        if (sessionUserId === undefined) {
            router.push("/login");
            return <></>;
        }

        try {
            if (isFavorite) {
                await RemoveFavorite({ userId: sessionUserId, recipeId });
                setIsFavorite(false);
            } else {
                await AddFavorite({ userId: sessionUserId, recipeId });
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            aria-label="Ajouter aux favoris"
            className="group flex items-center rounded-full bg-gray-100 p-2 transition-all duration-150 hover:bg-gray-200"
        >
            {isFavorite ? (
                <Heart className="size-8 fill-red-400 stroke-red-400 transition-all duration-150 group-hover:fill-red-500 group-hover:stroke-red-500" />
            ) : (
                <Heart className="size-8 stroke-gray-600 transition-all duration-150 group-hover:stroke-gray-800" />
            )}
        </button>
    );
}
