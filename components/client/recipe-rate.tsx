import { combo } from "@lib/combo";
import { Star } from "lucide-react";
import React from "react";

type RatingProps = {
    rating: number | null;
};

export default function RatingClient(props: RatingProps) {
    const { rating } = props;
    const filledStars = Math.round(rating ?? 0);

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
                <Star
                    key={index}
                    className={combo(
                        "size-8 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.2)]",
                        index < filledStars ? "text-yellow-400 fill-yellow-400" : "text-gray-400 fill-white"
                    )}
                />
            ))}
        </div>
    );
}
