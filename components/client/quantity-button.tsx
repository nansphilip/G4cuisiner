"use client";

import React, { useState } from "react";

interface QuantityButtonProps {
    ingredient: {
        quantity: number;
        unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE";
        recipeId: string;
        ingredientId: string;
        image: string | null;
    };
}

export default function QuantityButtonClient(props: QuantityButtonProps) {
    const { ingredient } = props;

    const [quantity, setQuantity] = useState(ingredient.quantity);

    const increase = () => setQuantity(quantity + 1);
    const decrease = () => setQuantity(quantity - 1);

    return (
        <div className="flex flex-row gap-4">
            <span>
                {quantity} {ingredient.unit.toLocaleLowerCase()}
            </span>
            <span className="flex flex-row gap-2">
                <button
                    onClick={decrease}
                    className="flex size-6 items-center justify-center rounded-full bg-gray-200 font-bold hover:bg-gray-300"
                >
                    −
                </button>
                <button
                    onClick={increase}
                    className="flex size-6 items-center justify-center rounded-full bg-gray-200 font-bold hover:bg-gray-300"
                >
                    +
                </button>
            </span>
        </div>
    );
}
