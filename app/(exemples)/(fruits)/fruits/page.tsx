import { GetFruits } from "@actions/database/Fruit";
import FruitCard from "@comps/server/fruit-card";

export default async function FruitsPage() {
    const fruitList = await GetFruits();

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
            <p>These fruits cards are based on a reusable component created for each fruit from the list.</p>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                {fruitList.map((fruit, index) => FruitCard({ index, fruitName: fruit.name, fruitImageUrl: fruit.imageUrl }))}
            </div>
        </main>
    );
}
