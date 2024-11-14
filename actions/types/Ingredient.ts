"use server";

export interface IngredientFixtures {
    id: string;
    name: string;
    description: string;
    image: string | null;
}

//Type pour récupérer et afficher les ingrédients lors de la création d'une recette
export interface IngredientCreateRecipe {
    id: string;
    name: string;
    image: string | null;
}
