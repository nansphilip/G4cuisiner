"use client";

import { CreateRecipe } from "@actions/database/Recipe";
import TypePlatCards from "@comps/client/type-plat-card";
import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import LoadingButton from "@comps/server/loading-button";
import { useSession } from "@lib/client";
import { Difficulty } from "@prisma/client";
import { useRef, useState } from "react";

type CreateRecipeClientProps = {
    className?: string;
    children: React.ReactNode;
};
export default function CreateRecipeClient(props: CreateRecipeClientProps) {
    const { className, children } = props;

    const { data: session } = useSession();

    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    const HandleSubmit = async (formData: FormData) => {
        // Start loading
        setLoading(true);

        try {
            if (!session) {
                throw new Error("You must be logged in to create a recipe.");
            }

            //Get the list of ingredients with their quantity
            const textArea = document.getElementById("ingredient-list");
            const ingredientString = textArea?.innerHTML;
            if (ingredientString != "" && ingredientString != null) {
                // Séparer chaque ingrédient
                const ingredientsArray = ingredientString.split(",");

                // Parcourir chaque ingrédient et le séparer en nom et quantité
                const parsedIngredients = ingredientsArray.map((item) => {
                    const [name, quantity] = item.split(":"); // Sépare le nom et la quantité
                    return { name: name.trim(), quantity: quantity.trim() }; // Enlève les espaces éventuels
                });
                console.log(parsedIngredients);
            }

            //Get the lunchstep id
            const lunchStepId = Number(formData.get("plateType")) as number;
            console.log(lunchStepId);

            //Affect the star rating to the enum dificulty
            const ratingNumber = Number(
                formData.get("dificultyLevel")
            ) as number;
            const difficultyLevel: Difficulty =
                ratingNumber === 1
                    ? "EASY"
                    : ratingNumber === 2
                    ? "MEDIUM"
                    : "HARD";

            //Get the total preparation time in minutes
            let minutesPrep = Number(formData.get("minuteTotalPrep")) as number;
            const hoursPrep = Number(formData.get("hourTotalPrep")) as number;
            minutesPrep += hoursPrep > 0 ? hoursPrep * 60 : 0;
            const preparationTime = minutesPrep;

            const newRecipe = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                image: null, // TODO: gérer la validation d'image, taille, format, stockage et sauvegarder l'url du dossier ici
                numberOfServing: Number(
                    formData.get("numberOfServing")
                ) as number,
                preparationTime: preparationTime,
                difficultyLevel: difficultyLevel,
                userId: session.user.id,
            };
            const response = await CreateRecipe(newRecipe);

            //TODO Add the ingredients to the associative table with parsedIngredients

            setMode("success");
            setMessage("Recipe created successfully.");

            console.log(response);
        } catch (error) {
            setMode("danger");
            setMessage("Failed to create recipe.");

            console.error(error);
        }

        // Stop loading
        setLoading(false);
    };

    return (
        <form action={HandleSubmit} className={className}>
            {children}
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <LoadingButton
                type="submit"
                label="Create new recipe"
                loading={loading}
            />
        </form>
    );
}
