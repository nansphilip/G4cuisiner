import { combo } from "@lib/combo";
import React from "react";

type RatingProps = {
    rating: number;
};

export default function RatingClient(props: RatingProps) {
    const { rating } = props;
    const filledStars = Math.round(rating);

    const stars = [];
    for (let index = 0; index < 5; index++) {
        stars.push(
            <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={combo("h-6 w-6", index < filledStars ? "text-yellow-500" : "text-gray-300")}
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        );
    }

    return <div className="flex items-center">{stars}</div>;
}
