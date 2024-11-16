"use client";

import { useState } from "react";
import Button from "@comps/server/button";
import { UpdateRecipeById } from "@actions/database/Recipe";
import { ReturnRecipeType } from "@actions/types/Recipe";

interface ReviewRecipesProps {
    recipes: ReturnRecipeType[];
}

const ReviewRecipes: React.FC<ReviewRecipesProps> = ({ recipes }) => {
    const [recipeList, setRecipeList] = useState(recipes);

    const handleUpdateStatus = async (recipeId: string, status: "APPROVED" | "REJECTED") => {
        try {
            // Appeler la fonction pour mettre à jour le statut de la recette dans la base de données
            await UpdateRecipeById({
                id: recipeId,
                data: {status},
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
            <h3 className="text-xl font-semibold">Nouvelles recettes en attente</h3>

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
                                                <Button
                                                    type="button"
                                                    variant="default"
                                                    className="bg-green-100 text-green-600 hover:bg-green-200"
                                                    onClick={() => handleUpdateStatus(recipe.id, "APPROVED")}
                                                >
                                                    Approuver
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="danger"
                                                    className="bg-red-100 text-red-600 hover:bg-red-200"
                                                    onClick={() => handleUpdateStatus(recipe.id, "REJECTED")}
                                                >
                                                    Rejeter
                                                </Button>
                                            </>
                                        )}
                                        {recipe.status === "REJECTED" && (
                                            <>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    disabled
                                                >
                                                    Approuver
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    disabled
                                                >
                                                    Rejeter
                                                </Button>
                                            </>
                                        )}
                                        {recipe.status === "APPROVED" && (
                                            <>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    disabled
                                                >
                                                    Approuver
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    disabled
                                                >
                                                    Rejeter
                                                </Button>
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