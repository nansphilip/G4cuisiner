"use client";

import { UpdateRecipeUser } from "@actions/database/RecipeUser";
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
            return router.push("/login");
        }

        // Update database
        await UpdateRecipeUser({
            userId: userRecipe.userId,
            recipeId: userRecipe.recipeId,
            favorite: !isFavorite
        });
        
        // Update state
        setIsFavorite(!isFavorite);
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
