"use client";

import { AddFavorite, RemoveFavorite } from "@actions/database/Favorite";
import { combo } from "@lib/combo";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type FavoriteProps = {
    favorite: boolean | null;
    recipeId: string;
    sessionUserId: string | undefined;
};

export default function FavoriteCLient(props: FavoriteProps) {
    const { favorite, recipeId, sessionUserId } = props;

    const router = useRouter();

    const [isFavorite, setIsFavorite] = useState<boolean>(favorite ?? false);

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
            <Heart
                className={combo(
                    "size-6 transition-all duration-150",
                    isFavorite
                        ? "fill-red-400 stroke-red-400  group-hover:fill-red-500 group-hover:stroke-red-500"
                        : "stroke-gray-600  group-hover:stroke-gray-800"
                )}
            />
        </button>
    );
}
