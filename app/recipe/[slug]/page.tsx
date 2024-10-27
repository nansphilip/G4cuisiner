import { SelectEveryRecipeSlugs, SelectRecipeBySlug } from "@actions/database/Recipe";
import RecipeClient from "./client";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Recipe",
    description: "Recipe page.",
}

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

    const recipe = await SelectRecipeBySlug({ slug: slug });

    return (
        <div className="flex flex-row items-baseline gap-8">
            <p className="font-bold">Recipe</p>
            <p>{"->"}</p>
            <p>{recipe?.title}</p>
            <p>{"->"}</p>
            <p>{recipe?.description}</p>
            <RecipeClient />
        </div>
    );
}
