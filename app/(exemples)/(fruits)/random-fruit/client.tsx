"use client";

import { GetRandomFruits } from "@actions/database/Fruit";
import { FruitType } from "@actions/types/Fruit";
import Button from "@comps/client/button";
import FruitCard from "@comps/server/fruit-card";
import Loader from "@comps/server/loader";
import { useState } from "react";

export default function FruitsClient() {
    const [fruitList, setFruitList] = useState<FruitType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const GetFruit = async () => {
        setIsLoading(true);
        const newFruit = await GetRandomFruits();

        if (newFruit) {
            const newFruitList = [...fruitList, newFruit];
            setFruitList(newFruitList);
        }
        setIsLoading(false);
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-center gap-4">
                {fruitList.map((fruit, index) => FruitCard({ index, fruitName: fruit.name, fruitImageUrl: fruit.imageUrl }))}
            </div>
            <Button
                type="button"
                disabled={isLoading}
                className="flex h-10 w-40 items-center justify-center p-6"
                onClick={GetFruit}
                ring="none"
            >
                {isLoading ? <Loader active={isLoading} /> : fruitList ? "Obtenir un fruit" : "Encore un fuit ?"}
            </Button>
        </>
    );
}
