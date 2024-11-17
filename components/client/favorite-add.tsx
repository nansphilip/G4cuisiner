"use client";

import { UpdateFavorite } from "@actions/database/Favorite";
import { combo } from "@lib/combo";
import { useStore } from "@lib/zustand";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export type FavoriteAddClientProps = {
    recipeId: string;
    userId: string | undefined;
    userFavorite: boolean | null | undefined;
    totalFavoriteAmount: number;
    classDiv?: string;
    classSvg?: string;
};

export type FavoriteStoreProps = [boolean, Date];

export default function FavoriteAddClient(props: FavoriteAddClientProps) {
    const { recipeId, userId, userFavorite, totalFavoriteAmount, classDiv, classSvg } = props;

    const router = useRouter();

    const [favorite, setFavorite] = useState<FavoriteStoreProps>([userFavorite ?? false, new Date()]);
    const { favoriteStore, setFavoriteStore } = useStore();
    const [favorisCount, setFavorisCount] = useState<number>(totalFavoriteAmount ?? 0);

    useEffect(() => {
        const isStoreMoreRecent = favoriteStore[1].getTime() > favorite[1].getTime();
        // Update useState or useStore with the most recent value
        if (isStoreMoreRecent) {
            setFavorite(favoriteStore);
        } else if (!isStoreMoreRecent) {
            setFavoriteStore(favorite);
        }
    }, [favorite, setFavorite, favoriteStore, setFavoriteStore]);

    const toggleFavorite = async () => {
        if (!userId) {
            return router.push("/login");
        }

        // Update database
        await UpdateFavorite({
            userId,
            recipeId,
            favorite: !favorite[0],
        });

        // Update state
        setFavorite([!favorite[0], new Date()]);
        setFavorisCount(favorite[0] ? favorisCount - 1 : favorisCount + 1);
    };

    return (
        <button
            onClick={toggleFavorite}
            aria-label="Ajouter aux favoris"
            className={combo("group flex flex-row size-fit gap-2 items-center justify-center", classDiv)}
        >
            <Heart
                className={combo(
                    "size-5 stroke-[1.5px] transition-all duration-150",
                    classSvg,
                    favorite[0]
                        ? "fill-red-400 stroke-red-400  group-hover:fill-red-500 group-hover:stroke-red-500"
                        : "stroke-gray-600 group-hover:stroke-gray-700 fill-white group-hover:fill-gray-200"
                )}
            />
            <div className="flex flex-col items-start max-lg:hidden">
                <span className="text-xs font-bold">Ajouter à mes favoris</span>
                <span className="text-xs text-gray-500">{favorisCount} cuisiniers l&apos;ont déjà ajouté</span>
            </div>
        </button>
    );
}
