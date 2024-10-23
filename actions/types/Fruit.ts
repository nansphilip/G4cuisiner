"use server";

export type DbFruitType = {
    id: string;
    name: string;
    description?: string;
    imageUrl: string;

    createdAt: Date;
    updatedAt: Date;
};

export type FruitType = {
    name: string;
    description: string;
    imageUrl: string;
}