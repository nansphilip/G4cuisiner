// Composant client
"use client";

// Imports des composants nécessaires
import { useState } from "react";

// Composant Page Fruits
export default function FruitsPage() {
    const [fruitList, setFruitList] = useState<RandomFruitType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const GetFruit = async () => {
        setIsLoading(true);
        const newFruit = await RandomFruits();

        if (newFruit) {
            const newFruitList = [...fruitList, newFruit];
            setFruitList(newFruitList);
        }
        setIsLoading(false);
    };

    // Afficher le contenu de la page
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
            <p>Click button to dynamically fetch fruits from server.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
                {fruitList.map((fruit, index) => (
                    <Card
                        key={index}
                        className="w-[300px] overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-gray-300"
                    >
                        <CardImage src={fruit.image} width={400} height={500} alt={fruit.nom} />
                        <CardHeader>
                            <CardTitle>{fruit.nom}</CardTitle>
                            <CardDescription>Fruit exotique</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
            <Button
                type="button"
                disabled={isLoading}
                className="flex h-10 w-40 items-center justify-center p-6"
                onClick={GetFruit}
                animation={true}
                ring="none"
            >
                {isLoading ? <Loader active={isLoading} /> : fruitList ? "Obtenir un fruit" : "Encore un fuit ?"}
            </Button>
        </main>
    );
}
