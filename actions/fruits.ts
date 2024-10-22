"use server";

export type RandomFruitType = {
    nom: string;
    image: string;
};

export const RandomFruits = async (): Promise<RandomFruitType> => {
    const fruitList = [
        { nom: "Kiwi", image: "/images/kiwi.webp" },
        { nom: "Mangue", image: "/images/mangue.webp" },
        { nom: "Ananas", image: "/images/ananas.webp" },
    ];

    const randomFruit = fruitList[Math.floor(Math.random() * fruitList.length)];

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(randomFruit);
        }, 1000);
    });
};
