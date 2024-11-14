"use client";

import { combo } from "@lib/combo";
import { Heart } from "lucide-react";
import { useStore } from "@lib/zustand";
import { useEffect, useState } from "react";
import { FavoriteStoreProps } from "./favorite-add";

export type FavoriteDisplayClientProps = {
    userFavorite: boolean | null;
    classDiv?: string;
    classSvg?: string;
};

export default function FavoriteDisplayClient(props: FavoriteDisplayClientProps) {
    const { userFavorite, classDiv, classSvg } = props;

    const [favorite, setFavorite] = useState<FavoriteStoreProps>([userFavorite ?? false, new Date()]);
    const { favoriteStore, setFavoriteStore } = useStore();

    useEffect(() => {
        const isStoreMoreRecent = favoriteStore[1].getTime() > favorite[1].getTime();
        // Update useState or useStore with the most recent value
        if (isStoreMoreRecent) {
            setFavorite(favoriteStore);
        } else if (!isStoreMoreRecent) {
            setFavoriteStore(favorite);
        }
    }, [favorite, setFavorite, favoriteStore, setFavoriteStore]);

    return (
        <div className={combo("flex size-fit items-center justify-center", classDiv)}>
            <Heart
                className={combo(
                    "size-5 stroke-[1.5px]",
                    classSvg,
                    favorite[0] ? "fill-red-400 stroke-red-400" : "stroke-gray-600 fill-white"
                )}
            />
        </div>
    );
}
