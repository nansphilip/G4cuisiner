"use client"

import { combo } from "@lib/combo";
import { Star } from "lucide-react";

type RatingDisplayAverageClientProps = {
    ratingAverage: number | null;
    totalRatingAmount?: number;
    classDiv?: string;
    classSvg?: string;
};

export default function RatingDisplayAverageClient(props: RatingDisplayAverageClientProps) {
    const { ratingAverage, totalRatingAmount, classDiv, classSvg } = props;
    
    const filledStars = Math.round(ratingAverage ?? 0);

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex flex-col items-center gap-1">
            <span className={combo("flex items-center", classDiv)}>
                {stars.map((star) => (
                    <Star
                        key={star}
                        className={combo(
                            "size-5 stroke-[1.5px]",
                            classSvg,
                            star <= filledStars ? "text-yellow-400 fill-yellow-400" : "text-gray-400 fill-white"
                        )}
                    />
                ))}
            </span>
            <span className="text-xs text-gray-500">notée par {totalRatingAmount} cuisiniers</span>
        </div>
    );
}
