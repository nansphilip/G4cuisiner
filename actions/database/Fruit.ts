"use server";

import Prisma from "@lib/prisma";
import { FruitType } from "@actions/types/Fruit";

export const GetFruits = async (): Promise<FruitType[]> => {
    try {
        const fruitList = await Prisma.fruit.findMany();

        // Simulate server delay of 1 second
        // Classic return: return fruitList
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fruitList);
            }, 500);
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
