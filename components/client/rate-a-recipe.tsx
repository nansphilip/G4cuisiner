"use client";

import { UpdateRecipeUser } from "@actions/database/RecipeUser";
import { RecipeUserType } from "@actions/types/RecipeUser";
import { combo } from "@lib/combo";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type RateRecipeClientProps = {
    userRecipe: RecipeUserType | null;
};

export default function RateRecipeClient(props: RateRecipeClientProps) {
    const { userRecipe } = props;

    const [rating, setRating] = useState<number>(userRecipe?.rating ?? 0);
    const [hoverIndex, setHoverIndex] = useState<number>(0);

    const router = useRouter();

    const handleRating = async (index: number) => {
        if (!userRecipe) {
            return router.push("/login");
        }

        // If rating is different from current, set it to the new rating, else set it to 0
        const newRating = rating !== index + 1;

        // Update database
        await UpdateRecipeUser({
            recipeId: userRecipe.recipeId,
            userId: userRecipe.userId,
            rating: newRating ? index + 1 : null,
        });

        // Update state
        setRating(newRating ? index + 1 : 0);
        setHoverIndex(newRating ? hoverIndex : 0);
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
                            "size-12 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]",
                            // rating state
                            index + 1 <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400 fill-white",
                            // hover
                            index + 1 <= hoverIndex &&
                                "fill-yellow-500 text-yellow-500 active:text-yellow-700 active:fill-yellow-700",
                            index >= hoverIndex && hoverIndex !== 0 && "text-gray-400 fill-white"
                        )}
                    />
                </button>
            ))}
        </div>
    );
}
