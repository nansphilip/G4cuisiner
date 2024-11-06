import Image from "next/image";
import {IngredientType} from "@actions/types/Ingredient";
import {RecipeIngredients} from "@actions/types/Recipe_ingredients";


export type IngredientListProps = {
    ingredients?: IngredientType[] | null; // Liste d'ingrédients
};


export default function IngredientList({ingredients}: IngredientListProps) {

    const missingIngredients: (IngredientType & RecipeIngredients)[] = [
        { id: "0", name: "Choix 1", image: "/placeholder-image.png", ingredientQuantity: "..." },
        { id: "1", name: "Choix 2", image: "/placeholder-image.png", ingredientQuantity: "..." },
        { id: "3", name: "Choix 3", image: "/placeholder-image.png", ingredientQuantity: "..." }
    ];
    const ingredientsRecipe = ingredients || missingIngredients;

    return (

        <div className="flex flex-wrap gap-4">
            {ingredientsRecipe.map((ingredient, index) => (
                <div key={index}
                     className="flex flex-col overflow-hidden rounded-lg border shadow transition-transform duration-150 hover:scale-105">
                    <Image
                        className="object-cover"
                        src={ingredient.image}
                        height={50}
                        width={50}
                        alt={ingredient.name}
                    />
                    <p className="text-sm text-center">{ingredient.name}</p>
                    <p className="text-sm text-center">{ingredient.ingredientQuantity}</p>
                </div>
            ))}
        </div>
    );
};