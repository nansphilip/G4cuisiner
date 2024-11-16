import Button from "@comps/server/button";
import Image from "next/image";

export type FruitProps = {
    index: number;
    fruitName: string;
    fruitImage: string;
};

export default function FruitCard (props: FruitProps) {
    const { index, fruitName, fruitImage } = props;

    return (
        <div key={index} className="flex flex-col overflow-hidden rounded-lg border shadow transition-transform duration-150 hover:scale-105">
            <Image className="aspect-[5/4] object-cover" src={fruitImage} height={200} width={250} alt={fruitName} />
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