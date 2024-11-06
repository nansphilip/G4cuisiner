import React, { useState } from "react";

interface RatingProps {
    rating: number; // Note actuelle
    onRate: (newRating: number) => void; // Fonction pour gérer la note
}

const RatingNote: React.FC<RatingProps> = ({ rating, onRate }) => {
    const [hovered, setHovered] = useState<number>(0); // Note survolée

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                const starRating = index + 1; // La note de chaque étoile

                return (
                    <span
                        key={index}
                        className={`cursor-pointer text-2xl ${
                            starRating <= (hovered || rating) ? "text-yellow-500" : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHovered(starRating)} // Met à jour la note survolée
                        onMouseLeave={() => setHovered(0)} // Réinitialise la note survolée
                        onClick={() => onRate(starRating)} // Met à jour la note
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default RatingNote;