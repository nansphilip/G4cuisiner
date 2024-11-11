import { combo } from "@lib/combo";
import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
    rating: number | null;
    totalRatingAmount?: number;
    counter?: boolean;
    classDiv?: string;
    classSvg?: string;
};

export default function Rating(props: RatingProps) {
    const { rating, totalRatingAmount, counter = true, classDiv, classSvg } = props;
    const filledStars = Math.round(rating ?? 0);

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
            {counter && <span className="text-xs text-gray-500">notée par {totalRatingAmount} cuisiniers</span>}
        </div>
    );
}
