"use client";
import { IngredientType } from "@actions/types/Ingredient";
import { useState } from "react";

export default function AddIngredientComponent({
    ingredientList,
}: {
    ingredientList: IngredientType[];
}) {
    const handleClick = () => {
        //Add the  ingredient with its quantity to the list
        const name: string = inputIngredient;
        const quantity: string = inputQuantity;
        const id: number = counter;
        const updatedList = [...ingredientRecipeList, { id, name, quantity }];
        setIngredientRecipeList(updatedList);
        //Update the counter of ingredients and reinitialize the inputs
        setCounter((previous) => previous + 1);
        setInputIngredient("");
        setInputQuantity("");

        //Set the listIngredientString in the invisible textarea
        const temp = updatedList
            .map((ingredient) => `${ingredient.name}:${ingredient.quantity}`)
            .join(",");
        setListIngredientString(temp);
    };

    const handleClickDelete = (id: number) => () => {
        setIngredientRecipeList(
            ingredientRecipeList.filter((ingredient) => ingredient.id !== id)
        );
        // setCounter(counter - 1);
    };

    type IngredientList = {
        id: number;
        name: string;
        quantity: string;
    };

    const [ingredientRecipeList, setIngredientRecipeList] = useState<
        IngredientList[]
    >([]);

    const [inputIngredient, setInputIngredient] = useState("");
    const [inputQuantity, setInputQuantity] = useState("");
    const [counter, setCounter] = useState(1);
    const [listIngredientString, setListIngredientString] = useState("");

    return (
        <>
            <div className="flex flex-col gap-4 rounded-xl border p-4 shadow">
                <h1>Ingrédient : </h1>
                <input
                    type="text"
                    list="data"
                    id="ingredient"
                    value={inputIngredient}
                    onChange={(e) => setInputIngredient(e.target.value)}
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                />
                <datalist id="data">
                    {ingredientList.map((IngredientType, key) => (
                        <option key={key} value={IngredientType.description} />
                    ))}
                </datalist>
                <label htmlFor="quantity">Quantité :</label>
                <input
                    type="text"
                    name="quantity"
                    id="quantity"
                    value={inputQuantity}
                    onChange={(e) => setInputQuantity(e.target.value)}
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                />
                <button
                    type="button"
                    className="rounded-md bg-black px-4 py-2 text-white"
                    onClick={handleClick}
                >
                    Ajouter l&apos;ingrédient
                </button>
            </div>
            <div className="flex flex-col gap-4 rounded-xl">
                {ingredientRecipeList.map((ingredient) => {
                    return (
                        <div
                            key={ingredient.id}
                            className="flex items-center justify-between gap-4 rounded-md border p-4 shadow"
                        >
                            <p>
                                <b>Ingrédient : </b>
                                {ingredient.name} | <b>Quantité : </b>
                                {ingredient.quantity}
                            </p>
                            <button
                                type="button"
                                className="rounded-md bg-black px-4 py-2 text-white"
                                onClick={handleClickDelete(ingredient.id)}
                            >
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
            <textarea
                value={listIngredientString}
                readOnly
                className="hidden rounded-md border p-4"
                id="ingredient-list"
            />
        </>
    );
}
