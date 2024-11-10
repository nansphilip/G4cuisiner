"use client";

import { CompleteRecipeType } from "@actions/types/Recipe";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";

type IngredientDisplayClientProps = {
    recipe: CompleteRecipeType;
};

export default function IngredientDisplayClient(props: IngredientDisplayClientProps) {
    const { recipe } = props;
    const { numberOfServing, ingredientList } = recipe;

    const unitFormatted = {
        GRAM: "g",
        KILOGRAM: "kg",
        LITER: "L",
        CENTILITER: "cL",
        MILLILITER: "mL",
        PIECE: "unité(s)",
    };

    return (
        <div>
            <p>
                <span>Personnes : </span>
                <span className="font-bold">{numberOfServing}</span>
            </p>
            <div className="flex flex-row gap-2 overflow-auto">
                {ingredientList.map(({ name, description, image, quantity, unit }, index) => (
                    <Tooltip key={index} showArrow={true} content={description}>
                        <div className="rounded border p-2">
                            <p className="font-bold">{name}</p>
                            {image && (
                                <Image className="object-cover" src={image} fall{"/ingredients/template.webp"} height={50} width={50} alt={description} />
                            )}
                            {quantity} {unitFormatted[unit]}
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
}
