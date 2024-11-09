"use client";

import { AddFavorite, RemoveFavorite } from "@actions/database/RecipeUser";
import { RecipeUserType } from "@actions/types/RecipeUser";
import { combo } from "@lib/combo";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type FavoriteProps = {
    userRecipe: RecipeUserType | null;
};

export default function FavoriteCLient(props: FavoriteProps) {
    const { userRecipe } = props;

    const [isFavorite, setIsFavorite] = useState<boolean>(userRecipe?.favorite ?? false);

    const router = useRouter();

    const toggleFavorite = async () => {
        if (!userRecipe) {
            router.push("/login");
            return <></>;
        }

        const { userId, recipeId } = userRecipe;
        const inputRecipeUser = { userId, recipeId };

        if (isFavorite) {
            await RemoveFavorite(inputRecipeUser);
            setIsFavorite(false);
        } else {
            await AddFavorite(inputRecipeUser);
            setIsFavorite(true);
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
