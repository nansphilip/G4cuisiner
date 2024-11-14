// "use client";

// import { CreateRecipe } from "@actions/database/Recipe";
// import { CommonType, CreateRecipeType, IngredientRecipeType } from "@actions/types/Recipe";
// // import { CreateRecipe } from "@actions/database/Recipe";
// import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
// import LoadingButton from "@comps/server/loading-button";
// import { useSession } from "@lib/client";
// import { Difficulty } from "@prisma/client";
// import { useState } from "react";
// import Swal from "sweetalert2";

// type CreateRecipeClientProps = {
//     className?: string;
//     children: React.ReactNode;
// };
// export default function CreateRecipeClient(props: CreateRecipeClientProps) {
//     const { className, children } = props;

//     const { data: session } = useSession();

//     const [loading, setLoading] = useState(false);
//     const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
//     const [message, setMessage] = useState("");

//     const HandleSubmit = async (formData: FormData) => {
//         //event.preventDefault();
//         // Start loading
//         setLoading(true);

//         try {
//             if (!session) {
//                 throw new Error("You must be logged in to create a recipe.");
//             }

//             // Fonction pour vérifier si tous les champs sont remplis
//             const validateFormData = (data: CreateRecipeType) => {
//                 for (const [key, value] of Object.entries(data)) {
//                     if (
//                         value === null ||
//                         value === undefined ||
//                         value === "" ||
//                         (Array.isArray(value) && value.length === 0)
//                     ) {
//                         return key; // Retourne la clé du champ vide
//                     }
//                 }
//                 return null; // Retourne null si tous les champs sont valides
//             };

//             //Get the list of ingredients with their quantity
//             const textArea = document.getElementById("ingredient-list");
//             const ingredientString = textArea?.innerHTML;
//             //let ingredientList: IngredientRecipeType[];
//             // Déclare un tableau vide de type IngredientRecipeType
//             const listeIngredient: {
//                 quantity: number;
//                 unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE";
//                 ingredientId: string;
//             }[] = [];

//             // Vérifie que `ingredientString` n'est pas vide ou nul
//             if (ingredientString !== "" && ingredientString !== null) {
//                 // Sépare chaque ingrédient par une virgule
//                 const ingredientsArray = ingredientString?.split(",");

//                 // Parcourt chaque ingrédient et ajoute l'objet au format IngredientRecipeType
//                 ingredientsArray?.forEach((item) => {
//                     const [id, name, quantity, unitName] = item.split(":");
//                     listeIngredient.push(
//                         ...[
//                             {
//                                 quantity: Number(quantity.trim()),
//                                 unit: unitName.trim() as IngredientRecipeType["ingredientList"][number]["unit"],
//                                 ingredientId: id.trim(),
//                             },
//                         ]
//                     );
//                 });
//             }

//             //Get the lunchstep
//             const lunchStep = formData.get("lunchStep") as CommonType["lunchStep"];

//             //Get the lunch type
//             const lunchType = formData.get("lunchType") as CommonType["lunchType"];

//             //Affect the star rating to the enum dificulty
//             const ratingNumber = Number(formData.get("dificultyLevel")) as number;
//             const difficultyLevel: Difficulty = ratingNumber === 1 ? "EASY" : ratingNumber === 2 ? "MEDIUM" : "HARD";

//             //Get the total preparation time in minutes
//             let minutesPrep = Number(formData.get("minuteTotalPrep")) as number;
//             const hoursPrep = Number(formData.get("hourTotalPrep")) as number;
//             minutesPrep += hoursPrep > 0 ? hoursPrep * 60 : 0;
//             const preparationTime = minutesPrep;
//             const image = formData.get("image") as string;
//             const imageList: {
//                 url: string;
//                 alt: string;
//             }[] = [
//                 {
//                     url: image,
//                     alt: formData.get("title") as string,
//                 },
//             ];

//             const recipeSteps = formData.get("recipe-step") as string;

//             const newRecipe: CreateRecipeType = {
//                 title: formData.get("title") as string,
//                 description: formData.get("description") as string,
//                 numberOfServing: Number(formData.get("numberOfServing")) as number,
//                 preparationTime: preparationTime,
//                 difficultyLevel: difficultyLevel,
//                 lunchType: lunchType, //TODO
//                 lunchStep: lunchStep, //TODO
//                 Steps: recipeSteps,
//                 userId: session.user.id,
//                 imageList: imageList, // TODO:
//                 ingredientList: listeIngredient, //TODO
//             };
//             const missingField = validateFormData(newRecipe);
//             if (missingField) {
//                 Swal.fire({
//                     icon: "error",
//                     title: "Champ manquant",
//                     text: `Le(s) champ(s) "${missingField}" est requis. Veuillez le remplir avant de soumettre.`,
//                     confirmButtonColor: "#d33",
//                     confirmButtonText: "OK",
//                 });
//                 return;
//             }
//             const response = await CreateRecipe(newRecipe);
//             console.log(response);
//             setMode("success");
//             setMessage("Recipe created successfully.");
//         } catch (error) {
//             setMode("danger");
//             setMessage("Failed to create recipe.");

//             console.error(error);
//         }

//         // Stop loading
//         setLoading(false);
//     };

//     return (
//         <form action={HandleSubmit} className={className}>
//             {children}
//             <FormFeedback mode={mode}>{message}</FormFeedback>
//             <LoadingButton type="submit" label="Create new recipe" loading={loading} />
//         </form>
//     );
// }
"use client";
import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import { CreateRecipe } from "@actions/database/Recipe";
import { CommonType, CreateRecipeType, IngredientRecipeType } from "@actions/types/Recipe";
import { useSession } from "@lib/client";
import { Difficulty } from "@prisma/client";
import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import LoadingButton from "@comps/server/loading-button";

type CreateRecipeClientProps = {
    className?: string;
    children: React.ReactNode;
};

export default function CreateRecipeClient(props: CreateRecipeClientProps) {
    const { className, children } = props;
    const { data: session } = useSession();

    const formRef = useRef<HTMLFormElement>(null); // Création d'une référence pour accéder au formulaire
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!formRef.current) return;

        // Start loading
        setLoading(true);

        try {
            if (!session) {
                throw new Error("You must be logged in to create a recipe.");
            }

            // Créez un FormData à partir du formulaire référencé
            const formData = new FormData(formRef.current);

            // Fonction pour vérifier si tous les champs sont remplis
            const validateFormData = (data: CreateRecipeType) => {
                for (const [key, value] of Object.entries(data)) {
                    if (
                        value === null ||
                        value === undefined ||
                        value === "" ||
                        (Array.isArray(value) && value.length === 0)
                    ) {
                        return key; // Retourne la clé du champ vide
                    }
                }
                return null; // Retourne null si tous les champs sont valides
            };

            // Récupérer la liste des ingrédients et autres données du formulaire
            const textArea = document.getElementById("ingredient-list");
            const ingredientString = textArea?.innerHTML;
            const listeIngredient: {
                quantity: number;
                unit: "GRAM" | "KILOGRAM" | "LITER" | "CENTILITER" | "MILLILITER" | "PIECE";
                ingredientId: string;
            }[] = [];

            if (ingredientString !== "" && ingredientString !== null) {
                const ingredientsArray = ingredientString?.split(",");
                ingredientsArray?.forEach((item) => {
                    const [id, name, quantity, unitName] = item.split(":");
                    listeIngredient.push({
                        quantity: Number(quantity.trim()),
                        unit: unitName.trim() as IngredientRecipeType["ingredientList"][number]["unit"],
                        ingredientId: id.trim(),
                    });
                });
            }

            // Récupération des autres données depuis formData
            //Get the lunchstep
            const lunchStep = formData.get("lunchStep") as CommonType["lunchStep"];

            //             //Get the lunch type
            const lunchType = formData.get("lunchType") as CommonType["lunchType"];
            const ratingNumber = Number(formData.get("dificultyLevel")) as number;
            const difficultyLevel: Difficulty = ratingNumber === 1 ? "EASY" : ratingNumber === 2 ? "MEDIUM" : "HARD";
            let minutesPrep = Number(formData.get("minuteTotalPrep")) as number;
            const hoursPrep = Number(formData.get("hourTotalPrep")) as number;
            minutesPrep += hoursPrep > 0 ? hoursPrep * 60 : 0;
            const preparationTime = minutesPrep;

            // Récupérer les fichiers d'images
            const imageFiles = formData.getAll("image") as File[];

            // Vérification que l'utilisateur a téléchargé entre 1 et 3 images
            if (imageFiles.length < 1 || imageFiles.length > 3) {
                alert("Vous devez télécharger entre 1 et 3 images.");
                return;
            }
            const titre = formData.get("title") as string;

            const imageList: { url: string; alt: string }[] = [];

            imageFiles.forEach((file, index) => {
                const ext = file.name.split(".").pop();
                const newFileName = `${titre.replace(/\s+/g, "-")}-${index + 1}.${ext}`;

                const imagePath = `/recipes/${newFileName}`; // Vous pouvez utiliser un chemin spécifique pour chaque image
                imageList.push({
                    url: imagePath,
                    alt: formData.get("title") as string, // Ou vous pouvez donner un titre spécifique pour chaque image
                });
            });
            // const image = formData.get("image") as File | null;
            // const imageName = image ? image.name : "";
            // const imageList: { url: string; alt: string }[] = [
            //     { url: "/recipes/" + imageName, alt: formData.get("title") as string },
            // ];

            const recipeSteps = formData.get("recipe-step") as string;

            const newRecipe: CreateRecipeType = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                numberOfServing: Number(formData.get("numberOfServing")) as number,
                preparationTime: preparationTime,
                difficultyLevel: difficultyLevel,
                lunchType: lunchType,
                lunchStep: lunchStep,
                Steps: recipeSteps,
                userId: session.user.id,
                imageList: imageList,
                ingredientList: listeIngredient,
            };
            console.log(newRecipe);

            //Verification des chammps requis
            const missingField = validateFormData(newRecipe);
            if (missingField) {
                Swal.fire({
                    icon: "error",
                    title: "Champ manquant",
                    text: `Le(s) champ(s) "${missingField}" est requis. Veuillez le remplir avant de soumettre.`,
                    confirmButtonColor: "#d33",
                    confirmButtonText: "OK",
                });
                // if (image === null) {
                //     Swal.fire({
                //         icon: "error",
                //         title: "Champ manquant",
                //         text: `Le champ "image" est requis. Veuillez le remplir avant de soumettre.`,
                //         confirmButtonColor: "#d33",
                //         confirmButtonText: "OK",
                //     });
                // }
                setLoading(false);
                return;
            }

            // Appeler la fonction pour créer la recette
            const response = await CreateRecipe(newRecipe);
            console.log(response);
            setMode("success");
            setMessage("Recipe created successfully.");
        } catch (error) {
            setMode("danger");
            setMessage("Failed to create recipe.");
            console.error(error);
        }

        // Stop loading
        setLoading(false);
    };

    return (
        <form ref={formRef} onSubmit={HandleSubmit} className={className}>
            {children}
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <LoadingButton type="submit" label="Create new recipe" loading={loading} />
        </form>
    );
}
