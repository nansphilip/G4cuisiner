"use client";

import React, { useState, useEffect } from "react";
import { addFavorite, removeFavorite, fetchUserFavorites } from "@actions/database/Favorite";

type FavoriteProps = {
    userId: string;
    slugRecipe: string;
};

const Favorite: React.FC<FavoriteProps> = ({ userId, slugRecipe }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const checkIfFavorite = async () => {
            try {
                const favorites = await fetchUserFavorites(userId);
                setIsFavorite(favorites.some(fav => fav.slug === slugRecipe));
            } catch (error) {
                console.error(error);
            }
        };
        checkIfFavorite();
    }, [userId, slugRecipe]);

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await removeFavorite(userId, slugRecipe);
            } else {
                await addFavorite(userId, slugRecipe);
            }
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error toggling favorite:", error);
        }
    };

    return (
        <button onClick={toggleFavorite} aria-label="Ajouter aux favoris" className="flex items-center">
            {isFavorite ? (
                <span role="img" aria-label="Étoile pleine" className="text-yellow-500">⭐</span>
            ) : (
                <span role="img" aria-label="Étoile vide" className="text-gray-400">☆</span>
            )}
            <span className="ml-2">{isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}</span>
        </button>
    );
};

export default Favorite;