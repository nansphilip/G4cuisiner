"use client";

import React, { useEffect, useState } from "react";
import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import LoadingButton from "@comps/server/loading-button";
import { ReturnIngredientType } from "@actions/types/Ingredient";
import { Minus, Plus } from "lucide-react";
import {
    description,
    difficultyLevel,
    lunchStep,
    lunchType,
    numberOfServing,
    preparationTime,
    instructions,
    CompleteRecipeType,
} from "@actions/types/Recipe";
import Button from "@comps/client/button";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import Image from "next/image";
import { Quantity } from "@prisma/client";
import { SelectRecipeById, UpdateRecipeById } from "@actions/database/Recipe";
import { combo } from "@lib/combo";

type EditRecipeClientProps = {
    recipe: CompleteRecipeType;
    ingredientList: ReturnIngredientType[];
};

export default function EditRecipeClient(props: EditRecipeClientProps) {
    const { recipe, ingredientList } = props;

    const {
        title: titleRaw,
        description: descriptionRaw,
        lunchStep: lunchStepRaw,
        lunchType: lunchTypeRaw,
        difficultyLevel: difficultyLevelRaw,
        numberOfServing: numberOfServingRaw,
        preparationTime: preparationTimeRaw,
        instructions: instructionsRaw,
        ingredientList: ingredientListRaw,
    } = recipe;

    // Submit feedback
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    // Simple input states
    const [description, setDescription] = useState<description | "">(descriptionRaw);
    const [lunchStep, setLunchStep] = useState<lunchStep>(lunchStepRaw);
    const [lunchType, setLunchType] = useState<lunchType>(lunchTypeRaw);
    const [difficultyLevel, setDifficultyLevel] = useState<difficultyLevel>(difficultyLevelRaw);
    const [numberOfServing, setNumberOfServing] = useState<numberOfServing>(numberOfServingRaw);
    const [instructionList, setInstructionList] = useState<instructions[]>(instructionsRaw.split("@@@@@"));

    // Preparation time
    const hourRaw = Math.trunc(preparationTimeRaw / 60);
    const minuteRaw = preparationTimeRaw % 60;
    const [hour, setHour] = useState<number>(hourRaw);
    const [minute, setMinute] = useState<number>(minuteRaw);
    const [preparationTime, setPreparationTime] = useState<preparationTime>(hourRaw * 60 + minuteRaw);
    useEffect(() => {
        if (hour && minute) {
            const totalMinute = hour * 60 + minute;
            setPreparationTime(totalMinute);
        } else if (hour && !minute) {
            setPreparationTime(hour * 60);
        } else if (!hour && minute) {
            setPreparationTime(minute);
        }
    }, [hour, minute]);

    // Mapping list
    const lunchStepList = [
        { enum: "APPETIZER", translate: "Apéritif" },
        { enum: "STARTER", translate: "Entrée" },
        { enum: "MAIN", translate: "Plat principal" },
        { enum: "DESSERT", translate: "Dessert" },
    ];
    const lunchTypeList = [
        { enum: "BREAKFAST", translate: "Petit déjeuner" },
        { enum: "LUNCH", translate: "Déjeuner" },
        { enum: "BRUNCH", translate: "Brunch" },
        { enum: "DINNER", translate: "Dîner" },
        { enum: "SNACK", translate: "Collation" },
    ];
    const difficultyLevelList = [
        { enum: "EASY", translate: "Facile" },
        { enum: "MEDIUM", translate: "Moyen" },
        { enum: "HARD", translate: "Difficile" },
    ];
    const unitList = [
        { enum: "GRAM", translate: "g" },
        { enum: "KILOGRAM", translate: "kg" },
        { enum: "LITER", translate: "L" },
        { enum: "CENTILITER", translate: "cl" },
        { enum: "MILLILITER", translate: "ml" },
        { enum: "PIECE", translate: "pièce" },
    ];

    // Ingredient list
    interface SelectedIngredientList extends ReturnIngredientType {
        quantity: Quantity["quantity"];
        unit: Quantity["unit"];
        unitTranslate: string;
    }

    const ingredientListRawFormatted = ingredientListRaw.map(({ ingredientId, name, image, quantity, unit }) => ({
        id: ingredientId,
        name: name,
        image: image,
        quantity: quantity as Quantity["quantity"],
        unit: unit as Quantity["unit"],
        unitTranslate: unitList.find((u) => u.enum === unit)?.translate ?? "",
    }));

    const [selectedIngredientList, setSelectedIngredientList] =
        useState<SelectedIngredientList[]>(ingredientListRawFormatted);
    const [quantity, setQuantity] = useState<Quantity["quantity"]>(1);
    const [unit, setUnit] = useState<Quantity["unit"]>("GRAM");
    const [currentIngredient, setCurrentIngredient] = useState<ReturnIngredientType["id"] | null>(null);
    const [inputIngredientList, setInputIngredientList] = useState<ReturnIngredientType[]>(
        ingredientList
            .filter((ingredient) => !ingredientListRaw.some((item) => item.ingredientId === ingredient.id))
            .sort((a, b) => a.name.localeCompare(b.name))
    );

    // Functions
    const addIngredientToList = () => {
        if (currentIngredient) {
            const currentIngredientData: SelectedIngredientList = {
                ...(inputIngredientList.find(
                    (ingredient) => ingredient.id === currentIngredient
                ) as ReturnIngredientType),
                quantity: quantity as Quantity["quantity"],
                unit: unit as Quantity["unit"],
                unitTranslate: unitList.find((u) => u.enum === unit)?.translate ?? "",
            };
            if (currentIngredientData) {
                // Remove current ingredient from input list
                setInputIngredientList((prev) => prev.filter((item) => item.id !== currentIngredient));
                // Add current ingredient to selected list
                setSelectedIngredientList((prev) => [...prev, currentIngredientData]);
                // Reset inputs
                setCurrentIngredient(null);
                setQuantity(1);
                setUnit("GRAM");
            }
        }
    };

    const removeIngredientFromList = (id: ReturnIngredientType["id"]) => () => {
        const ingredientToRemove = selectedIngredientList.find((ingredient) => ingredient.id === id);
        if (ingredientToRemove) {
            // Remove current ingredient from selected list
            setSelectedIngredientList((prev) => prev.filter((item) => item.id !== id));
            // Add current ingredient to input list
            setInputIngredientList((prev) =>
                [...prev, ingredientToRemove].sort((a, b) => a.name.localeCompare(b.name))
            );
        }
    };

    const handleRecipeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Start loading
        e.preventDefault();
        setLoading(true);

        if (
            description === "" ||
            preparationTime === 0 ||
            numberOfServing === 0 ||
            instructionList[0] === "" ||
            selectedIngredientList.length === 0
        ) {
            console.log(
                `Description: ${description}\n`,
                `Lunch step: ${lunchStep}\n`,
                `Lunch type: ${lunchType}\n`,
                `Difficulty level: ${difficultyLevel}\n`,
                `Preparation time: ${preparationTime}\n`,
                `Number of serving: ${numberOfServing}\n`,
                `Instructions: ${instructionList}\n`,
                `Ingredient list: ${selectedIngredientList}\n`
            );
            setMessage("Veuillez remplir tous les champs obligatoires.");
            setMode("warning");
            setLoading(false);
            return;
        }

        const existingRecipe = await SelectRecipeById({ id: recipe.id });

        if (!existingRecipe) {
            setMessage("Cette recette existe déjà, veuillez en choisir un autre titre.");
            setMode("warning");
            setLoading(false);
            return;
        }

        // Send recipe to server
        const recipeDate = await UpdateRecipeById({
            id: recipe.id,
            data: {
                description,
                lunchStep,
                lunchType,
                difficultyLevel,
                numberOfServing,
                preparationTime,
                instructions: instructionList.join("@@@@@"),
                ingredientList: selectedIngredientList.map(({ id: ingredientId, quantity, unit }) => ({
                    ingredientId,
                    quantity,
                    unit,
                })),
            },
        });

        if (!recipeDate) {
            setMessage("Une erreur est survenue lors de l'envoi de la recette. Veuillez réessayer.");
            setMode("danger");
            setLoading(false);
            return;
        }

        // Stop loading
        setMessage("La recette a bien été créée !");
        setMode("success");
        setLoading(false);
    };

    return (
        <form onSubmit={handleRecipeSubmit} className="w-full space-y-6">
            <h1 className="text-2xl font-bold">Mettre à jour la recette</h1>

            <section>
                <div className="text-lg font-bold">Titre</div>
                <div className="text-gray-500">{titleRaw}</div>
            </section>

            <section className="space-y-1">
                <label htmlFor="description" className="text-lg font-bold">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="w-full rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </section>

            <hr />

            <section className="space-y-1">
                <div className="text-lg font-bold">Étape de repas</div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {lunchStepList.map((step, index) => {
                        const formattedStep = step.enum.toLowerCase();
                        return (
                            <button
                                key={index}
                                type="button"
                                className="flex flex-col items-center justify-center overflow-hidden rounded-lg border shadow-md transition-all duration-150 hover:scale-105"
                                onClick={() => setLunchStep(step.enum as lunchStep)}
                            >
                                <Image
                                    src={`/lunchStep/${formattedStep}.webp`}
                                    className={combo(
                                        "p-3 h-[150px] w-full transition-all duration-150 bg-white object-contain",
                                        lunchStep === step.enum && "bg-orange-300"
                                    )}
                                    height={150}
                                    width={150}
                                    alt={`Select ${formattedStep}`}
                                />
                                <div className="py-3">{step.translate}</div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="space-y-1">
                <div className="text-lg font-bold">Type de repas</div>
                <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                    {lunchTypeList.map((type, index) => {
                        const formattedType = type.enum.toLowerCase();
                        return (
                            <button
                                key={index}
                                type="button"
                                className="flex flex-col items-center justify-center overflow-hidden rounded-lg border shadow-md transition-all duration-150 hover:scale-105"
                                onClick={() => setLunchType(type.enum as lunchType)}
                            >
                                <Image
                                    src={`/lunchType/${formattedType}.webp`}
                                    className={combo(
                                        "p-3 h-[150px] w-full transition-all duration-150 bg-white object-contain",
                                        lunchType === type.enum && "bg-orange-300"
                                    )}
                                    height={150}
                                    width={150}
                                    alt={`Select ${formattedType}`}
                                />
                                <div className="py-3">{type.translate}</div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="space-y-1">
                <div className="text-lg font-bold">Difficulté</div>
                <div className="grid grid-cols-3 gap-3">
                    {difficultyLevelList.map((difficulty, index) => {
                        const formattedDifficulty = difficulty.enum.toLowerCase();
                        return (
                            <button
                                key={index}
                                type="button"
                                className="flex flex-col items-center justify-center overflow-hidden rounded-lg border shadow-md transition-all duration-150 hover:scale-105"
                                onClick={() => setDifficultyLevel(difficulty.enum as difficultyLevel)}
                            >
                                <Image
                                    src={`/difficulty/${formattedDifficulty}.webp`}
                                    className={combo(
                                        "p-3 h-[150px] w-full transition-all duration-150 bg-white object-contain",
                                        difficultyLevel === difficulty.enum && "bg-orange-300"
                                    )}
                                    height={150}
                                    width={150}
                                    alt={`Select ${formattedDifficulty}`}
                                />
                                <div className="py-3">{difficulty.translate}</div>
                            </button>
                        );
                    })}
                </div>
            </section>

            <section className="flex flex-col gap-8 md:flex-row">
                <div className="w-full space-y-1 md:w-1/2">
                    <label htmlFor="numberOfServing" className="text-lg font-bold">
                        Nombre personnes
                    </label>
                    <div className="flex w-full flex-row items-center justify-center gap-2">
                        <Button type="button" buttonSize="none" onClick={() => setNumberOfServing(numberOfServing - 1)}>
                            <Minus className="size-fit" />
                        </Button>
                        <input
                            id="numberOfServing"
                            name="numberOfServing"
                            className="w-full rounded border text-center outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                            type="number"
                            min="1"
                            max="20"
                            onChange={(e) => setNumberOfServing(Number(e.target.value))}
                            value={numberOfServing}
                        />
                        <Button type="button" buttonSize="none" onClick={() => setNumberOfServing(numberOfServing + 1)}>
                            <Plus className="size-fit" />
                        </Button>
                    </div>
                </div>

                <div className="w-full space-y-1 md:w-1/2">
                    <div className="text-lg font-bold">Temps préparation</div>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <label htmlFor="hourTotalPrep" className="sr-only">
                            Nombre d&apos;heures
                        </label>
                        <input
                            id="hourTotalPrep"
                            name="hourTotalPrep"
                            className="w-full rounded border text-center outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                            type="number"
                            min="0"
                            max="23"
                            placeholder="Heures"
                            onChange={(e) => setHour(Number(e.target.value))}
                            value={hour}
                        />
                        <span className="whitespace-nowrap">heure(s) et</span>
                        <label htmlFor="minuteTotalPrep" className="sr-only">
                            Nombre de minutes
                        </label>
                        <input
                            id="minuteTotalPrep"
                            name="minuteTotalPrep"
                            className="w-full rounded border text-center outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                            type="number"
                            min="0"
                            max="59"
                            step={5}
                            placeholder="Minutes"
                            onChange={(e) => setMinute(Number(e.target.value))}
                            value={minute}
                        />
                        <span>minutes</span>
                    </div>
                </div>
            </section>

            <hr />

            <section className="w-full space-y-2">
                <h2 className="text-lg font-bold">Choisir les ingrédients</h2>
                <div className="w-full space-y-4">
                    {selectedIngredientList.length > 0 && (
                        <div className="flex flex-row gap-3 overflow-x-auto">
                            {selectedIngredientList.map((ingredient, index) => (
                                <div
                                    key={index}
                                    className="flex min-w-[150px] max-w-[150px] flex-col items-center justify-between gap-4 rounded-md border p-4"
                                >
                                    <Image
                                        src={ingredient.image ?? "/template.webp"}
                                        height={100}
                                        width={100}
                                        alt={ingredient.name}
                                    />
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="line-clamp-2 text-center">{ingredient.name}</div>
                                        <div className="font-bold">
                                            {ingredient.quantity} {ingredient.unitTranslate}
                                        </div>
                                    </div>
                                    <Button type="button" onClick={removeIngredientFromList(ingredient.id)}>
                                        Retirer
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Autocomplete
                                label="Recherche d'ingrédient"
                                aria-label="Recherche d'ingrédient"
                                onSelectionChange={(key) => setCurrentIngredient(key as string)}
                                selectedKey={currentIngredient}
                            >
                                {inputIngredientList.map((ingredient) => (
                                    <AutocompleteItem key={ingredient.id}>{ingredient.name}</AutocompleteItem>
                                ))}
                            </Autocomplete>
                        </div>
                        <div className="space-y-2">
                            <div>Quantité</div>
                            <div className="flex gap-3">
                                <label htmlFor="quantity" className="sr-only">
                                    Quantité
                                </label>
                                <input
                                    id="quantity"
                                    name="quantity"
                                    className="w-full rounded border text-center outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                                    type="number"
                                    onChange={(e) => setQuantity(Number(e.target.value) as Quantity["quantity"])}
                                    value={quantity}
                                />
                                <label htmlFor="unit" className="sr-only">
                                    Unité
                                </label>
                                <select
                                    id="unit"
                                    name="unit"
                                    className="rounded border text-center outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                                    onChange={(e) => setUnit(e.target.value as Quantity["unit"])}
                                    value={unit}
                                >
                                    {unitList.map((unit, index) => (
                                        <option key={index} value={unit.enum}>
                                            {unit.translate}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="w-full text-center">
                            <Button type="button" onClick={addIngredientToList}>
                                Ajouter l&apos;ingrédient
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <hr />

            <section className="space-y-3">
                <div>
                    <div className="text-lg font-bold">Instructions</div>
                    <div className="text-xs italic text-gray-500">
                        Ajouter des instructions les unes après les autres.
                    </div>
                </div>
                {instructionList.map((step, index) => (
                    <div key={index} className="space-y-1">
                        <div className="flex flex-row items-center justify-between">
                            <label htmlFor={`instruction-${index}`} className="font-bold">
                                Étape {index + 1}
                            </label>
                            <Button
                                type="button"
                                variant="ghost"
                                fontSize="xs"
                                className="py-1"
                                onClick={() => setInstructionList([...instructionList].filter((_, i) => i !== index))}
                            >
                                Retirer cette étape
                            </Button>
                        </div>
                        <textarea
                            id={`instruction-${index}`}
                            name={`instruction-${index}`}
                            className="w-full rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                            onChange={(e) => {
                                const newInstructionList = [...instructionList];
                                newInstructionList[index] = e.target.value;
                                setInstructionList(newInstructionList);
                            }}
                            value={step}
                        />
                    </div>
                ))}
                <div className="w-full text-center">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setInstructionList([...instructionList, ""])}
                    >
                        Ajouter une étape
                    </Button>
                </div>
            </section>

            <section className="flex flex-col items-center gap-2">
                <div className="flex w-full flex-row items-center justify-center gap-2">
                    <div className="h-px w-full rounded-full bg-gray-300" />
                    <div className="whitespace-nowrap text-lg font-bold">Envoyer les modifications</div>
                    <div className="h-px w-full rounded-full bg-gray-300" />
                </div>
                <div className="text-gray-500">Prenez le temps de vous relire avant de valider 😃</div>
                <FormFeedback mode={mode}>{message}</FormFeedback>
                <LoadingButton
                    className="my-4 px-16 py-1"
                    type="submit"
                    label="Mettre à jour la recette"
                    loading={loading}
                />
            </section>
        </form>
    );
}
