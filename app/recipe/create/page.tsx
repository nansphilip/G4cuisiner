import CreateRecipeClient from "./client";
import { SelectEveryIngredient } from "@actions/database/Ingredient";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Création de recipe",
    description: "Create recipe page.",
};

export default async function CreateRecipePage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const ingredientList = await SelectEveryIngredient();

    if (!ingredientList) {
        return <p>Il semblerait que nous ayons perdu nos ingredients...</p>;
    }

    return <CreateRecipeClient userId={session.user.id} ingredientList={ingredientList} />;
}
