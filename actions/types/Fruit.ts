"use server";

export type FruitType = {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string | null;

    createdAt: Date;
    updatedAt: Date;
}