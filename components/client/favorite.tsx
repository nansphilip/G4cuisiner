"use client";

import { UpdateFavorite } from "@actions/database/Favorite";
import { FavoriteType } from "@actions/types/Favorite";
import { combo } from "@lib/combo";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type FavoriteProps = {
    userFavorite: FavoriteType | null;
    userId: string | undefined;
    recipeId: string;
    totalFavoriteAmount?: number;
    classDiv?: string;
    classSvg?: string;
};

export default function FavoriteCLient(props: FavoriteProps) {
    const { userFavorite, userId, recipeId, totalFavoriteAmount, classDiv, classSvg } = props;

    const [isFavorite, setIsFavorite] = useState<boolean>(userFavorite?.favorite ?? false);
    const [favorisCount, setFavorisCount] = useState<number>(totalFavoriteAmount ?? 0);

    const router = useRouter();

    const toggleFavorite = async () => {
        if (!userId) {
            return router.push("/login");
        }

        // Update database
        await UpdateFavorite({
            userId,
            recipeId,
            favorite: !isFavorite,
        });

        // Update state
        setIsFavorite(!isFavorite);
        setFavorisCount(isFavorite ? favorisCount - 1 : favorisCount + 1);
    };

    return (
        <button
            onClick={toggleFavorite}
            aria-label="Ajouter aux favoris"
            className={combo("group flex size-fit gap-2 items-center justify-center", classDiv)}
        >
            <Heart
                className={combo(
                    "size-5 stroke-[1.5px] transition-all duration-150",
                    classSvg,
                    isFavorite
                        ? "fill-red-400 stroke-red-400  group-hover:fill-red-500 group-hover:stroke-red-500"
                        : "stroke-gray-600 group-hover:stroke-gray-700 fill-white group-hover:fill-gray-200"
                )}
            />
            <div className="flex flex-col items-start">
                <span className="text-xs font-bold">Ajouter à mes favoris</span>
                <span className="text-xs text-gray-500">{favorisCount} cuisiniers l&apos;ont déjà ajouté</span>
            </div>
        </button>
    );
}
