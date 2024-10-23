"use server";

import prisma from "@actions/lib/prisma";
import { FruitType } from "@actions/types/Fruit";

export const GetFruits = async (): Promise<FruitType[]> => {
    try {
        const fruitList: FruitType[] = await prisma.fruit.findMany({
            select: {
                name: true,
                description: true,
                imageUrl: true,
            },
        });

        // Simulate server delay of 1 second
        // Classic return: return fruitList
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fruitList);
            }, 1000);
        });
    } catch (error) {
        throw new Error("Unable to GetFruits -> " + (error as Error).message);
    }
};

export const GetRandomFruits = async (): Promise<FruitType> => {
    try {
        const fruitList = await GetFruits();
        const randomFruit = fruitList[Math.floor(Math.random() * fruitList.length)];

        return randomFruit;
    } catch (error) {
        throw new Error("Unable to GetRandomFruits -> " + (error as Error).message);
    }
};

// CRUD: Create, Read, Update, Delete functions
