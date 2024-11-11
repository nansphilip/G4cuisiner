"use client";

import { UpdateFavorite } from "@actions/database/Favorite";
import { FavoriteType } from "@actions/types/Favorite";
import { combo } from "@lib/combo";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type FavoriteProps = {
    userFavorite: FavoriteType | null;
    classDiv?: string;
    classSvg?: string;
};

export default function FavoriteCLient(props: FavoriteProps) {
    const { userFavorite, classDiv, classSvg } = props;

    const [isFavorite, setIsFavorite] = useState<boolean>(userFavorite?.favorite ?? false);

    const router = useRouter();

    const toggleFavorite = async () => {
        if (!userFavorite) {
            return router.push("/login");
        }

        // Update database
        await UpdateFavorite({
            userId: userFavorite.userId,
            recipeId: userFavorite.recipeId,
            favorite: !isFavorite,
        });

        // Update state
        setIsFavorite(!isFavorite);
    };

    return (
        <button
            onClick={toggleFavorite}
            aria-label="Ajouter aux favoris"
            className={combo("flex size-fit items-center justify-center", classDiv)}
        >
            <Heart
                className={combo(
                    "size-5 stroke-[1.5px] transition-all duration-150",
                    classSvg,
                    isFavorite
                        ? "fill-red-400 stroke-red-400  hover:fill-red-500 hover:stroke-red-500"
                        : "stroke-gray-600 hover:stroke-gray-700 fill-white hover:fill-gray-100"
                )}
            />
        </button>
    );
}
