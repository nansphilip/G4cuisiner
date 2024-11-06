"use client";

import React, { useState } from "react";

interface QuantityButtonProps {
    initialQuantity?: number; // Valeur initiale de la quantité
    onChange: (quantity: number) => void; // Fonction pour notifier le changement
}

const QuantityButton: React.FC<QuantityButtonProps> = ({ initialQuantity = 1, onChange }) => {
    const [quantity, setQuantity] = useState<number>(initialQuantity);

    const increment = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onChange(newQuantity); // Notifiez le parent du changement
    };

    const decrement = () => {
        if (quantity > 1) { // Empêche de descendre en dessous de 1
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onChange(newQuantity); // Notifiez le parent du changement
        }
    };

    return (
        <div>
        <div className="flex items-center">
            <button onClick={decrement} aria-label="Réduire la quantité" className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold hover:bg-gray-300 flex items-center justify-center">−</button>
            <span className="mx-4 text-lg font-bold">{quantity}</span>
            <button onClick={increment} aria-label="Augmenter la quantité" className="w-8 h-8 rounded-full bg-gray-200 text-xl font-bold hover:bg-gray-300 flex items-center justify-center">+</button>
        </div>
        </div>
    );
};

export default QuantityButton;