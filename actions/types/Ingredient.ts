"use server";

export interface IngredientType {
    name: string;
    description: string;
    quantity: number;
    unit: string;
}

export interface IngredientFixtures {
    id: string,
    name: string,
    description: string,
    image: string | null
}