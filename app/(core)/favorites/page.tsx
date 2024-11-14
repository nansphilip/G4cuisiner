import React from "react";
import FavoritesClient from "@app/(core)/favorites/client";

export default async function FavoritesPage() {
    return (
        <div className="flex size-full flex-col gap-4">
            <div className="m-2 font-bold text-2xl">
                <h1>Mes Favoris</h1>
            </div>
            <FavoritesClient />
        </div>
    );
};
