"use server";

import Prisma from "@prisma/client";

export type Ingredient = Prisma.Ingredient;

export type id = Ingredient["id"];
export type name = Ingredient["name"];
export type image = Ingredient["image"];
export type createdAt = Ingredient["createdAt"];
export type updatedAt = Ingredient["updatedAt"];

export interface ReturnIngredientType {
    id: id;
    name: name;
    image: image;
}
