import { SelectEveryRecipeSlugs, SelectRecipeBySlug } from "@actions/database/Recipe";
import EditRecipeClient from "./client";
import type { Metadata } from "next";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Edit recipe",
    description: "Edit recipe page.",
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

export default async function RecipePage(props: RecipePageProps) {
    const session = await getSession();
    if (!session) redirect("/login");

    const { params } = props;
    const { slug } = await params;

    const recipe = await SelectRecipeBySlug({ slug: slug });

    if (!recipe) {
        throw new Error("Recipe not found");
    }

    return (
        <EditRecipeClient
            className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow"
            recipe={recipe}
        />
    );
}
