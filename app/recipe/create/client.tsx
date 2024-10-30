"use client";

import { CreateRecipe } from "@actions/database/Recipe";
import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import LoadingButton from "@comps/server/loading-button";
import { useSession } from "@lib/client";
import { useState } from "react";

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

            const newRecipe = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                image: null, // TODO: gérer la validation d'image, taille, format, stockage et sauvegarder l'url du dossier ici
                userId: session.user.id
            }

            const response = await CreateRecipe(newRecipe);

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
            <LoadingButton type="submit" label="Create new recipe" loading={loading} />
        </form>
    );
}
