import { SelectEveryIngredient } from "@actions/database/Ingredient";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";
import EditRecipeClient from "./client";
import { SelectRecipeBySlug } from "@actions/database/Recipe";
import { Metadata } from "next";
import { SelectUserById } from "@actions/database/User";

export const metadata: Metadata = {
    title: "Édition de recipe",
    description: "Edit recipe page.",
};

type EditRecipePageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function EditRecipePage(props: EditRecipePageProps) {
    const { params } = props;
    const { slug } = await params;

    const recipe = await SelectRecipeBySlug({ slug });
    if (!recipe) {
        throw new Error("Recipe not found");
    }
    const authorId = recipe.userId;

    const session = await getSession();
    if (!session) redirect("/login");
    const sessionUserId = session.user.id;

    const user = await SelectUserById({ userId: session.user.id });
    const userRole = user?.role;

    if (authorId !== sessionUserId && userRole !== "ADMIN" && userRole !== "MODO") {
        redirect(`/recipe/${slug}`);
    }

    const ingredientList = await SelectEveryIngredient();

    if (!ingredientList) {
        return <p>Il semblerait que nous ayons perdu nos ingredients...</p>;
    }

    return <EditRecipeClient recipe={recipe} ingredientList={ingredientList} />;
}
