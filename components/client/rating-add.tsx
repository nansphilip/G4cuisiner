"use client";

import { DeleteRating, UpdateRating } from "@actions/database/Rating";
import { combo } from "@lib/combo";
import { useStore } from "@lib/zustand";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type RatingAddClientProps = {
    userRating: number | null;
    userId: string | undefined;
    recipeId: string;
    classDiv?: string;
    classSvg?: string;
};

export type RatingStoreProps = [number, Date];

export default function RatingAddClient(props: RatingAddClientProps) {
    const { userId, recipeId, userRating, classDiv, classSvg } = props;

    const [rating, setRating] = useState<RatingStoreProps>([userRating ?? 0, new Date()]);
    const {ratingStore, setRatingStore} = useStore();
    const [hoverIndex, setHoverIndex] = useState<number>(0);

    useEffect(() => {
        const isStoreMoreRecent = ratingStore[1].getTime() > rating[1].getTime();
        // Update useState or useStore with the most recent value
        if (isStoreMoreRecent) {
            setRating(ratingStore);
        } else if (!isStoreMoreRecent) {
            setRatingStore(rating);
        }
    }, [rating, setRating, ratingStore, setRatingStore]);

    const router = useRouter();

    const handleRating = async (star: number) => {
        // Check if user is logged in
        if (!userId) {
            return router.push("/login");
        }

        // Check if rating is new
        const newRating = rating[0] !== star;

        if (newRating) {
            // Update database
            await UpdateRating({ recipeId, userId, rating: star });
        } else {
            // Delete database
            await DeleteRating({ recipeId, userId });
        }

        // Update state
        setRating([newRating ? star : 0, new Date()]);
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
                            star <= rating[0] ? "text-yellow-400 fill-yellow-400" : "text-gray-400 fill-white",
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
