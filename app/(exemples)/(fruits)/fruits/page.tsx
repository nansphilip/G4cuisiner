import { GetFruits } from "@actions/database/Fruit";
import FruitCard from "@comps/server/fruit-card";
import FruitsClient from "./client";

export default async function FruitsPage() {
    const fruitList = await GetFruits();

    return (
        <>
            <p>These fruits cards are based on a reusable component created for each fruit from the list.</p>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                {fruitList.map((fruit, index) => {
                    if (fruit.image === null) {
                        return null;
                    }
                    return FruitCard({ index, fruitName: fruit.name, fruitImageUrl: fruit.image });
                })}
            </div>
            <FruitsClient />
        </>
    );
}
