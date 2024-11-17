"use client";

import { combo } from "@lib/combo";
import { useStore } from "@lib/zustand";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RatingStoreProps } from "./rating-add";

type RatingDisplayClientProps = {
    ratingUser: number | null;
    userId: string | undefined;
    currentUserId: string;
    classDiv?: string;
    classSvg?: string;
};

export default function RatingDisplayClient(props: RatingDisplayClientProps) {
    const { ratingUser, userId, currentUserId, classDiv, classSvg } = props;

    const [rating, setRating] = useState<RatingStoreProps>([ratingUser ?? 0, new Date()]);
    const { ratingStore, setRatingStore } = useStore();

    useEffect(() => {
        const isStoreMoreRecent = ratingStore[1].getTime() > rating[1].getTime();
        // Update useState or useStore with the most recent value
        if (isStoreMoreRecent) {
            setRating(ratingStore);
        } else if (!isStoreMoreRecent) {
            setRatingStore(rating);
        }
    }, [rating, setRating, ratingStore, setRatingStore]);

    const stars = [1, 2, 3, 4, 5];

    return (
        <span className={combo("flex items-center", classDiv)}>
            {stars.map((star) => (
                <Star
                    key={star}
                    className={combo(
                        "size-5 stroke-[1.5px]",
                        classSvg,
                        star <= (currentUserId === userId ? rating[0] : ratingUser ?? 0)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-400 fill-white"
                    )}
                />
            ))}
        </span>
    );
}
