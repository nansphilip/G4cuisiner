import Image from "next/image";
import kiwiImage from "@public/images/kiwi.webp";
import mangueImage from "@public/images/mangue.webp";
import ananasImage from "@public/images/ananas.webp";
import { StaticImageData } from "next/image";
import Button from "@comps/client/button";

// Composant Page Fruits
export default function FruitsPage() {
    // Liste de fruits et de leur image
    const fruitList = [
        { nom: "Kiwi", image: kiwiImage },
        { nom: "Mangue", image: mangueImage },
        { nom: "Ananas", image: ananasImage },
    ];

    // Afficher le contenu de la page
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
            <p>These fruits cards are based on a reusable component created for each fruit from the list.</p>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                {/* Rend le composant carte fruit pour chaque fruit dans la liste */}
                {fruitList.map((fruit, index) => FruitCard({ index, fruitName: fruit.nom, fruitImage: fruit.image }))}
            </div>
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
