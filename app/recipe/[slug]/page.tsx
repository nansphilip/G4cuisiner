import { SelectEveryRecipeSlugs, SelectRecipeBySlug } from "@actions/database/Recipe";
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

    const recipe = await SelectRecipeBySlug({ slug: slug });

    if (!recipe) {
        throw new Error("Recipe not found");
    }

    return (
        <div className="flex flex-col items-baseline gap-8">
                <div className="flex w-full flex-row justify-between gap-4">
                    <span className="font-bold">Recipe</span>
                    <span>{"->"}</span>
                    <span>{recipe.title}</span>
                </div>
                <div className="flex flex-col items-baseline gap-1">
                    <div className="flex flex-row gap-4">
                        <span>Description</span>
                        <span>{"->"}</span>
                        <span>{recipe.description}</span>
                    </div>
                    <div className="flex flex-row gap-4">
                        <span>Number of serving</span>
                        <span>{"->"}</span>
                        <span>{recipe.numberOfServing}</span>
                    </div>
                    <div className="flex flex-row gap-4">
                        <span>Preparation time</span>
                        <span>{"->"}</span>
                        <span>{recipe.preparationTime}</span>
                    </div>
                    <div className="flex flex-row gap-4">
                        <span>Difficulty level</span>
                        <span>{"->"}</span>
                        <span>{recipe.difficultyLevel}</span>
                    </div>
                    <div className="flex flex-row gap-4">
                        <span>Lunch step</span>
                        <span>{"->"}</span>
                        <span>{recipe.lunchStep}</span>
                    </div>
                    <div className="flex flex-row gap-4">
                        <span>Lunch type</span>
                        <span>{"->"}</span>
                        <span>{recipe.lunchType}</span>
                    </div>
                </div>
            {/* <RecipeClient /> */}
        </div>
    );
}
