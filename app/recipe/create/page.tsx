import CreateRecipeClient from "./client";
import CounterComposant from "@comps/client/counter";
import TypePlatCards from "@comps/client/type-plat-card";
import StarRating from "@comps/client/star-rating";
import AddIngredientComponent from "@comps/client/add-ingredient-component";
import { IngredientType } from "@actions/types/Ingredient";
import { GetIngredient } from "@actions/database/Ingredient";
import { LunchStepType } from "@actions/types/LunchStep";
import { GetLunchSteps } from "@actions/database/LunchStep";
// import AddIngredientsToRecipe from "@comps/client/add-ingredient-recipe";
//import { Suspense } from "react";

export default async function CreateRecipePage() {
    const ingredientList: IngredientType[] = await GetIngredient();
    const lunchStepList: LunchStepType[] = await GetLunchSteps();

    return (
        <>
            <CreateRecipeClient className="flex w-2/3 flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow">
                <label className="flex w-2/3 flex-col gap-1">
                    Title
                    <input
                        className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                        name="title"
                        type="text"
                        required
                        autoFocus
                    />
                </label>
                <label className="flex w-2/3 flex-col gap-1">
                    Description
                    <textarea
                        className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                        name="description"
                        required
                    />
                </label>
                <label className="mb-6 flex w-2/3 flex-col gap-1">
                    <div>
                        <span>Image</span>
                    </div>
                    <input
                        className="h-6 cursor-pointer rounded border text-xs ring-teal-400 ring-offset-2 transition-all duration-150 file:pointer-events-none file:h-6 file:cursor-pointer file:border-none file:text-xs file:transition-all file:duration-150 hover:bg-gray-50 hover:file:bg-gray-200 focus:ring-2"
                        name="image"
                        type="file"
                        accept="image/*"
                    />
                </label>
                <div className="flex justify-center gap-10">
                    <TypePlatCards lunchStepList={lunchStepList} />
                    <div className="flex w-auto flex-none flex-col gap-4 rounded-xl border p-4 shadow">
                        <CounterComposant />
                        <label className="mt-6 flex flex-col gap-4">
                            Temps total de préparation
                            <span>
                                <i>(Temps de cuisine + temps de cuisson)</i>
                            </span>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="number"
                                        name="hourTotalPrep"
                                        className="mt-1 h-10 w-20 rounded border border-gray-300 px-2 text-center"
                                        min="0"
                                        max="23"
                                        placeholder=""
                                    />
                                    <span className="ml-2">Heures</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="number"
                                        name="minuteTotalPrep"
                                        className="mt-1 h-10 w-20 rounded border border-gray-300 px-2 text-center"
                                        min="0"
                                        max="59"
                                        placeholder=""
                                    />
                                    <span className="ml-2">Minutes</span>
                                </label>
                            </div>
                        </label>

                        <StarRating />
                    </div>
                </div>
                {/* <div className="rounded-xl border p-4 shadow items-center justify-center gap-4">
          <Suspense fallback={<div>Loading ingredients...</div>}>
            <AddIngredientsToRecipe ingredientList={ingredientList} />
          </Suspense>
        </div> */}
                <div className="flex flex-col items-center justify-center gap-4 rounded-xl border p-4 shadow ">
                    <span>Choisir les ingrédients de la recette :</span>
                    <div className="flex items-center justify-center gap-4">
                        <AddIngredientComponent
                            ingredientList={ingredientList}
                        />
                    </div>
                </div>
            </CreateRecipeClient>
        </>
    );
}
