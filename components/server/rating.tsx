import { combo } from "@lib/combo";
import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
    rating: number | null;
    classDiv?: string;
    classSvg?: string;
};

export default function Rating(props: RatingProps) {
    const { rating, classDiv, classSvg } = props;
    const filledStars = Math.round(rating ?? 0);

    const stars = [1, 2, 3, 4, 5];

    return (
        <div className={combo("flex items-center", classDiv)}>
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
        </div>
    );
}
