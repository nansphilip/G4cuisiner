import { SelectEveryRecipeSlugs, SelectRecipeBySlug } from "@actions/database/Recipe";
import RecipeClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Recipe",
    description: "Recipe page.",
};

export async function generateStaticParams() {
    const recipeList = await SelectEveryRecipeSlugs();

    return recipeList.map((recipe) => ({ slug: recipe.slug }));
}

type RecipePageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
    const { slug } = await params;

    const session = await getSession();

    const recipe = await SelectRecipeBySlug({ slug });
    const ingredientDetails = await SelectIngredientBySlug({ slug });
    const recipeSteps = await RecipeWithSteps({ slug });
    const recipeList = await SelectEveryRecipeSlugs();
    const ingredientList = await GetIngredient();
    const ingredient = await SelectIngredientBySlug({ slug });

    if (!recipe) {
        throw new Error("Recipe not found");
    }

    // Passez les données à votre composant client
    return (
        <div className="flex flex-col items-baseline gap-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-8">
                <p className="font-bold">Recipe</p>
                <p>{"->"}</p>
                <p>{recipe.title}</p>
                <p>{"->"}</p>
                <p>{recipe.description}</p>
            </div>
            <div>
                <h1 className="flex text-5xl font-bold">{recipe.title}</h1>
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                <RecipeCard recipeName={recipe.title} recipeImageUrl={recipe.image} />
                <RecipeClient
                    recipe={{ ...recipe, steps: recipeSteps || [] }}
                    ingredients={ingredientDetails}
                    userId={session?.user.id}
                />
                <RecipeClient
                    recipe={{ ...recipe, steps: recipeSteps || [] }}
                    ingredients={ingredientDetails}
                    userId={session?.user.id}
                />
            </div>
            <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                <IngredientList ingredients={ingredient} />
            </div>
            <div className="flex w-full rounded border">{recipe.description}</div>
        </div>
    );
}
