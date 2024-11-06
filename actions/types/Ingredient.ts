"use server";

export type IngredientType = {
  id: string;
  name: string;
  description: string;
  image: string;

  createdAt: Date;
  updatedAt: Date;
};

export interface IngredientFixtures {
    id: string,
    name: string,
    description: string,
    image: string | null
}