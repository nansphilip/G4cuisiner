"use client";

import { UpdateRecipeById } from "@actions/database/Recipe";
import { RecipeType } from "@actions/types/Recipe";
import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import LoadingButton from "@comps/server/loading-button";
import { useSession } from "@lib/client";
import { useState } from "react";

type EditRecipeClientProps = {
    recipe: RecipeType;
    className?: string;
};
export default function EditRecipeClient(props: EditRecipeClientProps) {
    const { recipe, className } = props;

    const { data: session } = useSession();

    const [title, setTitle] = useState(recipe.title);
    const [description, setDescription] = useState(recipe.description);
    // const [image, setImage] = useState(recipe.image);

    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    const HandleSubmit = async () => {
        // Start loading
        setLoading(true);

        try {
            if (!session) {
                throw new Error("You must be logged in to create a recipe.");
            }

            const updatedRecipe = {
                id: recipe.id,
                title,
                description,
                image: null, // TODO: gérer la validation d'image, taille, format, stockage et sauvegarder l'url du dossier ici
                userId: session.user.id,
            };

            const response = await UpdateRecipeById(updatedRecipe);

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
        <form className={className}>
            <label className="flex w-full flex-col gap-1">
                Title
                <input
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    autoFocus
                />
            </label>
            <label className="flex w-full flex-col gap-1">
                Description
                <textarea
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            {/* <label className="flex w-full flex-col gap-1">
                <div>
                    <span>Image</span>
                </div>
                <input
                    className="h-6 cursor-pointer rounded border text-xs ring-teal-400 ring-offset-2 transition-all duration-150 file:pointer-events-none file:h-6 file:cursor-pointer file:border-none file:text-xs file:transition-all file:duration-150 hover:bg-gray-50 hover:file:bg-gray-200 focus:ring-2"
                    name="image"
                    type="file"
                    accept="image/*"
                    value={image as string}
                    onChange={(e) => setImage(e.target.value)}
                />
            </label> */}
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <LoadingButton
                type="button"
                onClick={HandleSubmit}
                label="Update recipe"
                loading={loading}
            />
        </form>
    );
}
