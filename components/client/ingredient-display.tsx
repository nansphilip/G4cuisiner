"use client";

import { CompleteRecipeType } from "@actions/types/Recipe";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

type IngredientDisplayClientProps = {
    recipe: CompleteRecipeType;
};

export default function IngredientDisplayClient(props: IngredientDisplayClientProps) {
    const { recipe } = props;
    const { numberOfServing, ingredientList } = recipe;

    const imageTemplate = "/template.webp";
    const [imageLoadList, setImageLoadList] = useState<string[]>(
        ingredientList.map((ingredient) => ingredient.image ?? imageTemplate)
    );

    const [servingCount, setServingCount] = useState<number>(numberOfServing);
    const increase = () => setServingCount(servingCount + 1);
    const decrease = () => setServingCount(servingCount - 1);

    const unitFormatted = {
        GRAM: "g",
        KILOGRAM: "kg",
        LITER: "L",
        CENTILITER: "cL",
        MILLILITER: "mL",
        PIECE: "unité(s)",
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-row items-center gap-3">
                <span>Choisir le nombre de personnes : </span>
                <span className="flex h-fit flex-row items-center gap-3">
                    <button
                        onClick={decrease}
                        className="group flex size-6 items-center justify-center rounded-full bg-gray-200 font-bold hover:bg-gray-300"
                    >
                        <Minus className="size-fit stroke-gray-700 group-hover:stroke-black" />
                    </button>
                    <span className="text-lg font-bold">{servingCount}</span>
                    <button
                        onClick={increase}
                        className="group flex size-6 items-center justify-center rounded-full bg-gray-200 font-bold hover:bg-gray-300"
                    >
                        <Plus className="size-fit stroke-gray-700 group-hover:stroke-black" />
                    </button>
                </span>
            </div>
            <div className="flex flex-row gap-2 overflow-auto">
                {ingredientList.map(({ name, description, image, quantity, unit }, index) => (
                    <Tooltip key={index} content={description}>
                        <div className="flex min-w-32 max-w-32 flex-col items-center justify-between gap-2 rounded border px-3 py-2">
                            <div className="text-wrap text-center font-bold">{name}</div>
                            <div className="size-20">
                                {image && (
                                    <Image
                                        className="aspect-square object-cover"
                                        src={imageLoadList[index]}
                                        onError={() => {
                                            const newImageList = [...imageLoadList];
                                            newImageList[index] = imageTemplate;
                                            setImageLoadList(newImageList);
                                        }}
                                        height={80}
                                        width={80}
                                        alt={description}
                                    />
                                )}
                            </div>
                            <div className="flex flex-row gap-1">
                                <span>{Math.round(((quantity * servingCount) / numberOfServing) * 10) / 10}</span>
                                <span className="text-gray-500">{unitFormatted[unit]}</span>
                            </div>
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}
