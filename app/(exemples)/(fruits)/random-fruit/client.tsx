// Composant client
"use client";

import { GetRandomFruits } from "@actions/database/Fruit";
import { FruitType } from "@actions/types/Fruit";
import FruitCard from "@comps/server/fruit-card";
import LoadingButton from "@comps/server/loading-button";
import { useState } from "react";

export default function FruitsClient() {
    const [fruitList, setFruitList] = useState<FruitType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const GetFruit = async () => {
        // Start loader
        setIsLoading(true);

        // Fetch a new fruit
        const newFruit = await GetRandomFruits();

        // Create a new array with the new fruit
        const newFruitList = [...fruitList, newFruit];
        
        // Update the state of the fruit list
        setFruitList(newFruitList);

        // Stop loader
        setIsLoading(false);
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-center gap-4">
                {fruitList.map((fruit, index) => FruitCard({ index, fruitName: fruit.name, fruitImageUrl: fruit.image }))}
            </div>
            <LoadingButton
                type="button"
                onClick={GetFruit}
                label="Obtenir un fruit"
                loading={isLoading}
                className="px-4 py-2"
            />
        </>
    );
}
