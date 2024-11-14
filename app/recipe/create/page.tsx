import CreateRecipeClient from "./client";
import CounterComposant from "@comps/client/counter";
import TypePlatCards from "@comps/client/type-plat-card";
import AddIngredientComponent from "@comps/client/add-ingredient-component";
// import { IngredientType } from "@actions/types/Ingredient";
// import { GetIngredient } from "@actions/database/Ingredient";
// import { LunchStepType } from "@actions/types/LunchStep";
// import { GetLunchSteps } from "@actions/database/LunchStep";
import StarRating from "@comps/client/dificulty";
// import AddIngredientsToRecipe from "@comps/client/add-ingredient-recipe";
//import { Suspense } from "react";
import { selectAllIngredients } from "@actions/database/Ingredient";
import { IngredientCreateRecipe } from "@actions/types/Ingredient";
import LunchTypeCombo from "@comps/client/lunch-type-combo";
import Editor from "@comps/client/editor";
import ImageImporter from "@comps/client/image";

export default async function CreateRecipePage() {
    const ingredientList: IngredientCreateRecipe[] = await selectAllIngredients();
    // Fonction pour gérer les données sauvegardées

    return (
        <>
            <CreateRecipeClient className="flex w-2/3 flex-col items-center justify-center gap-6 rounded-xl border p-4 shadow">
                <label className="mb-6 flex w-2/3 flex-col gap-1">
                    <ImageImporter />
                </label>
                <div className="flex justify-center gap-10">
                    <TypePlatCards />
                    <div className="flex w-auto flex-none flex-col gap-10 rounded-xl border p-4 shadow">
                        <LunchTypeCombo />
                        <CounterComposant />
                        <label className="flex flex-col items-center justify-center gap-4">
                            <h2 className="text-xl font-bold">Temps total de préparation : </h2>
                            <span className="text-sm">
                                <i>(Temps de cuisine + temps de cuisson)</i>
                            </span>
                            <div className="flex w-full gap-4">
                                <label className="flex w-full items-center">
                                    <input
                                        type="number"
                                        name="hourTotalPrep"
                                        className="mt-1 h-10 w-full rounded border border-gray-300 px-2 text-center"
                                        min="0"
                                        max="23"
                                        placeholder="heures"
                                    />
                                    <span className="ml-2">:</span>
                                </label>
                                <label className="flex w-full items-center">
                                    <input
                                        type="number"
                                        name="minuteTotalPrep"
                                        className="mt-1 h-10 w-full rounded border border-gray-300 px-2 text-center"
                                        min="0"
                                        max="59"
                                        placeholder="minutes"
                                    />
                                </label>
                            </div>
                        </label>

                        <StarRating number={0} />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border p-4 shadow ">
                    <h2 className="text-xl font-bold">Choisir les ingrédients de la recette : </h2>
                    <div className="flex gap-4">
                        <AddIngredientComponent ingredientList={ingredientList} />
                    </div>
                </div>
                <Editor />
            </CreateRecipeClient>
        </>
    );
}
