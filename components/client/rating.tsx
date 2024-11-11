"use client";

import { DeleteRating, UpdateRating } from "@actions/database/Rating";
import { RatingType } from "@actions/types/Rating";
import { combo } from "@lib/combo";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type RatingClientProps = {
    userRating: RatingType | null;
    classDiv?: string;
    classSvg?: string;
};

export default function RatingClient(props: RatingClientProps) {
    const { userRating, classDiv, classSvg } = props;

    const [rating, setRating] = useState<number>(userRating?.rating ?? 0);
    const [hoverIndex, setHoverIndex] = useState<number>(0);

    const router = useRouter();

    const handleRating = async (star: number) => {
        if (!userRating) {
            return router.push("/login");
        }

        console.log("Last rating: ", rating, "New rating: ", star);

        const newRating = rating !== star;

        if (newRating) {
            // Update database
            await UpdateRating({
                recipeId: userRating.recipeId,
                userId: userRating.userId,
                rating: star,
            });
        } else {
            // Delete database
            await DeleteRating({
                recipeId: userRating.recipeId,
                userId: userRating.userId,
            });
        }

        // Update state
        setRating(newRating ? star : 0);
        setHoverIndex(newRating ? hoverIndex : 0);
    };

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className={combo("flex items-center", classDiv)}>
            {stars.map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoverIndex(star)}
                    onMouseLeave={() => setHoverIndex(0)}
                >
                    <Star
                        className={combo(
                            "size-5 hover:scale-110 stroke-[1.5px] transition-all duration-150",
                            classSvg,
                            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400 fill-white",
                            star <= hoverIndex &&
                                "fill-yellow-500 text-yellow-500 active:text-yellow-700 active:fill-yellow-700",
                            star > hoverIndex && hoverIndex !== 0 && "text-gray-400 fill-white"
                        )}
                    />
                </button>
            ))}
        </div>
    );
}
