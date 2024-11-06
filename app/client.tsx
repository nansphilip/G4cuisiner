"use client";

import { useSession } from "@lib/client";
import Button from "@comps/client/button";
import React, {useEffect, useState} from "react";
import {fetchUserFavorites} from "@actions/database/Favorite";
import Loader from "@comps/server/loader";


export default function HomeClient() {
    const { data: session, isPending, isRefetching } = useSession();

    if (isPending || isRefetching) {
        return <Loader />;
    }
    const [favorites, setFavorites] = useState<any[]>([]); // Utilisez un tableau pour stocker les favoris

    useEffect(() => {
        const loadFavorites = async () => {
            if (session && session.user) {
                const userFavorites = await fetchUserFavorites(session.user.id);
                setFavorites(userFavorites); // Stocker les favoris récupérés
            }
        };

        loadFavorites();
    }, [session]);

    return session ? (
        <>
            <Button type="link" href="/logout" variant="outline">
                Logout
            </Button>
            <span>Ici affichage favori  : </span>
            <ul>
                {favorites.map(recipe => ( // Mettez à jour pour utiliser recipe au lieu de recipeId
                    <li key={recipe.id}>
                        <a href={`/recipe/${recipe.slug}`}>Recette: {recipe.title}</a> {/* Lien vers la recette */}
                    </li>
                ))}
            </ul>

        </>
    ) : (
        <>
            <Button type="link" href="/register" variant="outline">
                Register
            </Button>
            <Button type="link" href="/login">
                Login
            </Button>
        </>
    );
}
