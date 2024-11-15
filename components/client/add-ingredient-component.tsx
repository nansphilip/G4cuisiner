"use client";
import { IngredientCreateRecipe } from "@actions/types/Ingredient";
import { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

//////////////////////////////////////////////////////////////////////////
//// Verification que l'image de l'ingredient existe ///////////////////
//////////////////////////////////////////////////////////////////////////
const IngredientImage = ({ imageUrl, name }: { imageUrl: string; name: string }) => {
    const [imageExists, setImageExists] = useState(false);
    const imageError = "/ingredients/template.webp";

    //Verification que l'image existe
    useEffect(() => {
        const img = document.createElement("img");
        img.src = imageUrl;

        img.onload = () => setImageExists(true); // Image found
        img.onerror = () => setImageExists(false); // Image not found
    }, [imageUrl]);

    return <Image src={imageExists ? imageUrl : imageError} alt={name} width={60} height={60} />;
};

export default function AddIngredientComponent({ ingredientList }: { ingredientList: IngredientCreateRecipe[] }) {
    const handleClick = () => {
        //Verify if both input are not empty
        if (inputIngredient === "" || inputQuantity === "") {
            // Affiche l'alerte d'erreur si le champ est vide
            Swal.fire({
                icon: "error",
                title: "Champ requis",
                text: "Veuillez remplir les deux champs pour ajouter un ingrédient.",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK",
            });
            return;
        }
        //Add the  ingredient with its quantity to the list
        const name: string = inputIngredient;
        const quantity: string = inputQuantity;
        const id: number = counter;
        //Gets the ingredient id by its name
        const idIngredient = ingredientList.find((ingredient) => ingredient.name === name)?.id;
        //Affectation de l'image de l'ingredient à la liste des ingredients
        const imageUrl: string = findImage(name);
        // Get the unit name
        const unitName: string | undefined = selectedCombo;
        // Get the unit abreviation with the unit
        const unit: string | undefined = unitList.find((unitSearch) => unitSearch.name === unitName)?.abreviation;
        const updatedList = [...ingredientRecipeList, { id, idIngredient, name, quantity, unit, unitName, imageUrl }];
        setIngredientRecipeList(updatedList);

        //Gets the ingredient id by its name
        // const idIngredient = ingredientList.find((ingredient) => ingredient.name === name)?.id;

        //Set the listIngredientString in the invisible textarea
        const temp = updatedList
            .map(
                (ingredient) =>
                    `${ingredient.idIngredient}:${ingredient.name}:${ingredient.quantity}:${ingredient.unitName}`
            )
            .join(",");
        setListIngredientString(temp);

        //Update the counter of ingredients and reinitialize the inputs
        setCounter((previous) => previous + 1);
        setInputIngredient("");
        setInputQuantity("");
        //setSelectedCombo("");
    };

    // Au clic sur le bouton supprimer un ingredient dans la liste
    const handleClickDelete = (id: number) => () => {
        setIngredientRecipeList(ingredientRecipeList.filter((ingredient) => ingredient.id !== id));
        // setCounter(counter - 1);
    };

    // Trouve l'image de l'ingredient dans le dossier public
    const findImage = (name: string) => {
        let imageUrl = ingredientList.find((ingredient) => ingredient.name === name)?.image;
        if (!imageUrl) {
            imageUrl = "/ingredients/template.webp";
            return imageUrl;
        }
        return imageUrl;
    };

    //////////////////////////////////////////////////////////////////////////
    //// Declaration des types pour les ingredients ///////////////////////
    //////////////////////////////////////////////////////////////////////////

    interface UnitList {
        abreviation: string;
        name: string;
    }

    type IngredientListWithId = {
        idIngredient: string | undefined;
        id: number;
        name: string;
        quantity: string;
        unit: string | undefined;
        unitName: string | undefined;
        imageUrl: string;
    };

    const unitList: UnitList[] = [
        { abreviation: "g", name: "GRAM" },
        { abreviation: "kg", name: "KILOGRAM" },
        { abreviation: "L", name: "LITER" },
        { abreviation: "cL", name: "CENTILITER" },
        { abreviation: "mL", name: "MILLILITER" },
        { abreviation: "piece", name: "PIECE" },
    ];

    //////////////////////////////////////////////////////////////////////////
    //// Declaration des STATES ///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    const [ingredientRecipeList, setIngredientRecipeList] = useState<IngredientListWithId[]>([]);
    const [inputIngredient, setInputIngredient] = useState("");
    const [inputQuantity, setInputQuantity] = useState("");
    const [counter, setCounter] = useState(1);
    const [listIngredientString, setListIngredientString] = useState("");
    const [selectedCombo, setSelectedCombo] = useState<string>("GRAM");

    const onSelectionChange = (value: string) => {
        setInputIngredient(value);
    };

    const onInputChange = (value: string) => {
        setInputIngredient(value);
    };

    return (
        <>
            <div className="flex h-64 flex-col gap-4 rounded-xl border p-4 shadow">
                <h1>Ingrédient : </h1>
                <Autocomplete
                    label="Recherche d'ingrédient"
                    onSelectionChange={onSelectionChange}
                    onInputChange={onInputChange}
                >
                    {ingredientList.map((ingredient) => (
                        <AutocompleteItem
                            key={ingredient.name}
                            value={ingredient.name}
                            // onClick={() => setInputIngredient(ingredient.name)}
                        >
                            {ingredient.name}
                        </AutocompleteItem>
                    ))}
                </Autocomplete>
                <label htmlFor="quantity">Quantité :</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={inputQuantity}
                        onChange={(e) => setInputQuantity(e.target.value)}
                        className="w-full rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    />
                    <select
                        onChange={(e) => setSelectedCombo(e.target.value)}
                        className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    >
                        {unitList.map((unit) => (
                            <option key={unit.abreviation} value={unit.name}>
                                {unit.abreviation}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="button"
                    className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700"
                    onClick={handleClick}
                >
                    Ajouter l&apos;ingrédient
                </button>
            </div>
            <div className="flex w-full flex-col gap-4 rounded-xl lg:w-2/3">
                {ingredientRecipeList.map((ingredient) => {
                    return (
                        <div
                            key={ingredient.id}
                            className="flex flex-col items-center justify-between gap-4 rounded-md border p-4 shadow lg:flex-row"
                        >
                            <IngredientImage imageUrl={ingredient.imageUrl} name={ingredient.name} />

                            <p>
                                <b>Ingrédient : </b>
                                {ingredient.name} | <b>Quantité : </b>
                                {ingredient.quantity} {ingredient.unit}
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
