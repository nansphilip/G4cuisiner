import { SelectEveryRecipeSlugs, SelectRecipeBySlug } from "@actions/database/Recipe";
import RecipeClient from "./client";

export async function generateStaticParams() {
    const slugList = await SelectEveryRecipeSlugs();

    return slugList.map(({slug}) => {
        if (!slug) {
            throw new Error("No name provided.");
        }
        return { slug: slug.replace(/\s/g, "-").toLowerCase() };
    });
}

type RecipePageProps = {
    params: {
        slug: string;
    };
};

export default async function RecipePage({ params }: RecipePageProps) {
    const { slug } = params;

    const recipe = await SelectRecipeBySlug({ slug: slug });

    return (
        <div className="flex flex-row items-baseline gap-8">
            <p className="font-bold">Recipe</p>
            <p>{"->"}</p>
            <p>{recipe?.name}</p>
            <p>{"->"}</p>
            <p>{recipe?.description}</p>
            <RecipeClient />
        </div>
    );
}
