// Composant client
import { RandomFruits } from "@actions/fruits";
import Button from "@comps/client/button";
import Loader from "@comps/server/loader";
import Image, { StaticImageData } from "next/image";

// Composant Page Fruits
export default function FruitsPage() {


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
                {fruitList.map((fruit, index) => FruitCard({ index, fruitName: fruit.nom, fruitImage: fruit.image }))}
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
        </main>
    );
}

// Props de Composant Carte Fruit
type FruitProps = {
    index: number;
    fruitName: string;
    fruitImage: StaticImageData;
};

const FruitCard = (props: FruitProps) => {
    const { index, fruitName, fruitImage } = props;

    return (
        <div key={index} className="flex flex-col overflow-hidden rounded-lg border shadow transition-transform duration-150 hover:scale-105">
            <Image className="aspect-[5/4] object-cover" placeholder="blur" src={fruitImage} height={200} width={250} alt={fruitName} />
            <div className="flex flex-col gap-4 p-4">
                <div>
                    <p>{fruitName}</p>
                    <p className="text-xs text-gray-500">Fruit exotique</p>
                </div>
                <div className="flex flex-row justify-between">
                    <Button type="button" variant="outline">Preview</Button>
                    <Button type="button">Open fruit</Button>
                </div>
            </div>
        </div>
    );
};