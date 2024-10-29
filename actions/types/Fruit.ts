"use server";

export type FruitType = {
    id: string;
    name: string;
    description: string;
    image: string;

    createdAt: Date;
    updatedAt: Date;
}