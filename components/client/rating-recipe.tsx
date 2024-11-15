import React from "react";

const Rating = ({ rating }) => {
    const maxRating = 5; // Nombre total d'étoiles
    const filledStars = Math.round(rating); // Arrondir la note à l'entier le plus proche pour les étoiles remplies

    return (
        <div className="flex items-center">
            {Array.from({ length: maxRating }, (_, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`size-6 ${index < filledStars ? "text-yellow-500" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
            ))}
        </div>
    );
};

export default Rating;
