"use client";

import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

interface QuantityButtonProps {
    ingredient: {
        quantity: number;
        unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE";
        // recipeId: string;
        ingredientId: string;
        name: string;
        description: string;
    };
}

export default function QuantityButton(props: QuantityButtonProps) {
    const { ingredient } = props;

    const {unit} = ingredient;
    const unitFormatted =
        (unit === "GRAM" && "g") ||
        (unit === "KILOGRAM" && "kg") ||
        (unit === "LITER" && "L") ||
        (unit === "CENTILITER" && "cL") ||
        (unit === "MILLILITER" && "mL") ||
        (unit === "PIECE" && "unité(s)");

    const [quantity, setQuantity] = useState(ingredient.quantity);

    const increase = () => setQuantity(quantity + 1);
    const decrease = () => setQuantity(quantity - 1);

    return (
        <div className="flex flex-row gap-4">
            <span>
                {quantity} {unitFormatted}
            </span>
            <span className="flex h-fit flex-row gap-2">
                <button
                    onClick={decrease}
                    className="group flex size-5 items-center justify-center rounded-full bg-gray-200 font-bold hover:bg-gray-300"
                >
                    <Minus className="size-fit stroke-gray-700 group-hover:stroke-black" />
                </button>
                <button
                    onClick={increase}
                    className="group flex size-5 items-center justify-center rounded-full bg-gray-200 font-bold hover:bg-gray-300"
                >
                    <Plus className="size-fit stroke-gray-700 group-hover:stroke-black" />
                </button>
            </span>
        </div>
    );
}
