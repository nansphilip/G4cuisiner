"use client";

import { combo } from "@lib/combo";
import { Star } from "lucide-react";
import React, { useState } from "react";

interface RateRecipeClientProps {
    recipeId: string;
}

export default function RateRecipeClient(props: RateRecipeClientProps) {
    const { recipeId } = props;


    const [rating, setRating] = useState<number>(0); // 0 à 5 inclus
    const [hoverIndex, setHoverIndex] = useState<number>(0);

    const handleRating = async (index: number) => {
        // Todo : Update the rating in the database

        setRating(index + 1);
    };

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => handleRating(index)}
                    onMouseEnter={() => setHoverIndex(index + 1)}
                    onMouseLeave={() => setHoverIndex(0)}
                >
                    <Star
                        className={combo(
                            "size-8",
                            // rating state
                            index + 1 <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400 fill-transparent",
                            // hover
                            index + 1 <= hoverIndex && "fill-yellow-400 text-yellow-400 active:text-yellow-600 active:fill-yellow-600",
                            index >= hoverIndex && hoverIndex !== 0 && "text-gray-400 fill-transparent"
                        )}
                    />
                </button>
            ))}
        </div>
    );
}
