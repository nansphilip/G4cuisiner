import { combo } from "@lib/combo";
import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
    rating: number | null;
};

export default function RatingClient(props: RatingProps) {
    const { rating } = props;
    const filledStars = Math.round(rating ?? 0);

    const stars = [];

    for (let index = 0; index < 5; index++) {
        stars.push(
            <Star
                className={combo("size-8", index < filledStars ? "text-yellow-400 fill-yellow-400" : "text-gray-400")}
            />
        );
    }

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    className={combo(
                        "size-8",
                        index < filledStars ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
                    )}
                />
            ))}
        </div>
    );
}
