// Imports des composants nécessaires
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardImage, CardTitle } from "@ui/card";
import Button from "@comps/ui/button";
import kiwiImage from "@images/kiwi.webp";
import mangueImage from "@images/mangue.webp";
import ananasImage from "@images/ananas.webp";
import { StaticImageData } from "next/image";

// Composant Page Fruits
export default function FruitsPage() {
    // Liste de fruits et de leur image
    const fruitsList = [
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
                {fruitsList.map((fruit, index) => FruitCard({ index, fruitName: fruit.nom, fruitImage: fruit.image }))}
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

// Composant Carte Fruit
const FruitCard = (props: FruitProps) => {
    // Destructuration des props en variables
    const { index, fruitName, fruitImage } = props;

    // Affichage du composant carte fruit
    return (
        <Card
            key={index}
            className="w-[300px] overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-gray-300"
        >
            <CardImage src={fruitImage} alt={fruitName} />
            <CardHeader>
                <CardTitle>{fruitName}</CardTitle>
                <CardDescription>Fruit exotique</CardDescription>
            </CardHeader>
            <CardContent className="line-clamp-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi sint dolore tempore accusantium,
                atque, alias minima dolorum adipisci magni aliquid.
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button type="button" variant="outline">
                    Preview
                </Button>
                <Button type="button">Open</Button>
            </CardFooter>
        </Card>
    );
};
