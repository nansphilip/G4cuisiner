"use client";

import { useState } from "react";
import ButtonClient from "@comps/client/button";
import { UpdateRecipeStatus } from "@actions/database/Recipe";

interface Recipe {
    id: string;
    title: string;
    description: string;
    userId: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    user: string; // Nom de l'utilisateur qui a soumis la recette
}

interface ReviewRecipesProps {
    recipes: Recipe[];
}

const ReviewRecipes: React.FC<ReviewRecipesProps> = ({ recipes }) => {
    const [recipeList, setRecipeList] = useState(recipes);

    const handleUpdateStatus = async (recipeId: string, status: "APPROVED" | "REJECTED") => {
        try {
            // Appeler la fonction pour mettre à jour le statut de la recette dans la base de données
            await UpdateRecipeStatus({
                recipeId,
                status,
            });

            // Mettre à jour l'état local avec le nouveau statut
            setRecipeList(prevList =>
                prevList.map(recipe =>
                    recipe.id === recipeId ? { ...recipe, status } : recipe
                )
            );
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut de la recette :", error);
        }
    };

    return (
        <div className="space-y-4 p-4">
            <h3 className="text-xl font-semibold">Evaluation des Nouvelles Recettes</h3>

            {/* Table des recettes à réviser */}
            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b px-4 py-2 text-left">Nom</th>
                            <th className="border-b px-4 py-2 text-left">Description</th>
                            <th className="border-b px-4 py-2 text-left">Status</th>
                            <th className="border-b px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipeList.map((recipe) => (
                            <tr key={recipe.id}>
                                <td className="border-b px-4 py-2">{recipe.title}</td>
                                <td className="border-b px-4 py-2">
                                    <div
                                        className="max-h-20 overflow-hidden overflow-y-auto"
                                        title={recipe.description}
                                    >
                                        {recipe.description}
                                    </div>
                                </td>
                                <td className="border-b px-4 py-2">{recipe.status}</td>
                                <td className="border-b px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        {recipe.status === "PENDING" && (
                                            <>
                                                <ButtonClient
                                                    type="button"
                                                    variant="default"
                                                    className="w-auto max-w-xs truncate bg-green-100 text-green-500 hover:bg-green-200"
                                                    onClick={() => handleUpdateStatus(recipe.id, "APPROVED")}
                                                >
                                                    Approuver
                                                </ButtonClient>
                                                <ButtonClient
                                                    type="button"
                                                    variant="danger"
                                                    className="w-auto max-w-xs truncate bg-red-100 text-red-500 hover:bg-red-200"
                                                    onClick={() => handleUpdateStatus(recipe.id, "REJECTED")}
                                                >
                                                    Rejeter
                                                </ButtonClient>
                                            </>
                                        )}
                                        {recipe.status === "REJECTED" && (
                                            <>
                                                <ButtonClient
                                                    type="button"
                                                    variant="default"
                                                    className="w-auto max-w-xs bg-gray-100 text-gray-400 hover:bg-gray-200"
                                                    disabled
                                                >
                                                    Approuver
                                                </ButtonClient>
                                                <ButtonClient
                                                    type="button"
                                                    variant="danger"
                                                    className="w-auto max-w-xs bg-red-100 text-red-500 hover:bg-red-200"
                                                    disabled
                                                >
                                                    Rejeter
                                                </ButtonClient>
                                            </>
                                        )}
                                        {recipe.status === "APPROVED" && (
                                            <>
                                                <ButtonClient
                                                    type="button"
                                                    variant="default"
                                                    className="w-auto max-w-xs bg-green-100 text-green-500 hover:bg-green-200"
                                                    disabled
                                                >
                                                    Approuver
                                                </ButtonClient>
                                                <ButtonClient
                                                    type="button"
                                                    variant="default"
                                                    className="w-auto max-w-xs bg-gray-100 text-gray-400 hover:bg-gray-200"
                                                    disabled
                                                >
                                                    Rejeter
                                                </ButtonClient>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewRecipes;