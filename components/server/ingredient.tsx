import Image from "next/image";

export type IngredientType = {
    id: string;
    name: string;
    image: string;
};
export type RecipeIngredients = {
    slugRecipe: string;
    ingredientId: string;
    ingredientQuantity: string;
};

export type IngredientListProps = {
    ingredients?: IngredientType[] | null; // Liste d'ingrédients
    recipe_ingredients?: RecipeIngredients[] | null;
};

export default function IngredientList({ingredients, recipe_ingredients}: IngredientListProps) {
    const missingIngredients: (IngredientType & { ingredientQuantity : string })[] = [
        { id: "0", name: "Choix 1", image: "/placeholder-image.png", ingredienQuantity: "..." },
        { id: "1", name: "Choix 2", image: "/placeholder-image.png", ingredienQuantity: "..." },
        { id: "3", name: "Choix 3", image: "/placeholder-image.png", ingredienQuantity: "..." }
    ];

    const ingredientsRecipe = ingredients && ingredients.length > 0 ? ingredients.map(ingredient => ({
            ...ingredient,
            ingredientQuantity: recipe_ingredients?.find(r => r.ingredientId === ingredient.id)?.ingredientQuantity || "..."
        }))
        : missingIngredients;

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