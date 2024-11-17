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
    title,
} from "@actions/types/Recipe";
import Button from "@comps/server/button";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import Image from "next/image";
import { Quantity } from "@prisma/client";
import UploadImages from "@actions/utils/UploadImages";
import { CreateRecipe, SelectRecipeByTitle } from "@actions/database/Recipe";

type CreateRecipeClientProps = {
    userId: string;
    ingredientList: ReturnIngredientType[];
};

export default function CreateRecipeClient(props: CreateRecipeClientProps) {
    const { userId, ingredientList } = props;

    // Submit feedback
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    // Simple input states
    const [title, setTitle] = useState<title | "">("");
    const [description, setDescription] = useState<description | "">("");
    const [lunchStep, setLunchStep] = useState<lunchStep>("APPETIZER");
    const [lunchType, setLunchType] = useState<lunchType>("BREAKFAST");
    const [difficultyLevel, setDifficultyLevel] = useState<difficultyLevel>("EASY");
    const [numberOfServing, setNumberOfServing] = useState<numberOfServing>(1);
    const [instructionList, setInstructionList] = useState<instructions[]>([""]);

    // Image list
    const [imageFileList, setImageFileList] = useState<File[] | null>(null);

    // Preparation time
    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [preparationTime, setPreparationTime] = useState<preparationTime>(0);
    useEffect(() => {
        if (hour && minute) {
            const totalMinute = hour * 60 + minute;
            setPreparationTime(totalMinute);
        }
    }, [hour, minute]);

    // Ingredient list
    const [quantity, setQuantity] = useState<Quantity["quantity"]>(1);
    const [unit, setUnit] = useState<Quantity["unit"]>("GRAM");
    const [currentIngredient, setCurrentIngredient] = useState<ReturnIngredientType["id"] | null>(null);
    const [inputIngredientList, setInputIngredientList] = useState<ReturnIngredientType[]>(
        ingredientList.sort((a, b) => a.name.localeCompare(b.name))
    );
    interface SelectedIngredientList extends ReturnIngredientType {
        quantity: Quantity["quantity"];
        unit: Quantity["unit"];
        unitTranslate: string;
    }
    const [selectedIngredientList, setSelectedIngredientList] = useState<SelectedIngredientList[]>([]);

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

    const handleImageList = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = Array.from(e.target.files as FileList);

        if (!fileList) {
            return console.log("No file selected");
        }

        const imageExtensions = ["image/jpeg", "image/png", "image/webp"];
        const imageSize = 5 * 1024 * 1024; // 5MB

        fileList.map((file) => {
            if (file.size > imageSize) {
                return console.log("File too big");
            }
            if (!imageExtensions.includes(file.type)) {
                return console.log("File extension not supported");
            }
        });

        // Store raw file list
        setImageFileList(fileList);
    };

    const handleRecipeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Start loading
        e.preventDefault();
        setLoading(true);

        const existingRecipe = await SelectRecipeByTitle({ title });

        if (existingRecipe) {
            setMessage("Cette recette existe déjà, veuillez en choisir un autre titre.");
            setMode("warning");
            setLoading(false);
            return;
        }

        // Send recipe to server
        const recipeDate = await CreateRecipe({
            title,
            description,
            lunchStep,
            lunchType,
            difficultyLevel,
            numberOfServing,
            preparationTime,
            userId,
            instructions: instructionList.join("@@@@@"),
            imageNameList: imageFileList?.map((image) => image.name) ?? [],
            ingredientList: selectedIngredientList.map(({ id: ingredientId, quantity, unit }) => {
                return {
                    ingredientId,
                    quantity,
                    unit,
                };
            }),
        });

        if (!recipeDate) {
            setMessage("Une erreur est survenue lors de l'envoi de la recette. Veuillez réessayer.");
            setMode("danger");
            setLoading(false);
            return;
        }

        // Send image to server
        const confirmation = await UploadImages({ recipeTitle: title, imageList: imageFileList as File[] });

        if (!confirmation) {
            setMessage("Une erreur est survenue lors de l'envoi des images. La recette n'a pas été créée.");
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
            <div className="flex flex-row gap-8">
                <div className="w-1/2 space-y-1">
                    <label htmlFor="title" className="text-lg font-bold">
                        Titre
                    </label>
                    <input
                        id="title"
                        name="title"
                        className="w-full rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        autoFocus
                    />
                </div>
                <div className="w-1/2 space-y-1">
                    <div className="flex flex-row items-baseline justify-between">
                        <label htmlFor="image-import" className="text-lg font-bold">
                            Images
                        </label>
                        <div className="text-xxs italic text-gray-500">3 maximum</div>
                    </div>
                    <input
                        id="image-import"
                        name="image-import"
                        className="h-6 w-full cursor-pointer rounded border text-xs ring-teal-400 ring-offset-2 transition-all duration-150 file:pointer-events-none file:h-6 file:cursor-pointer file:border-none file:text-xs file:transition-all file:duration-150 hover:bg-gray-50 hover:file:bg-gray-200 focus:ring-2"
                        type="file"
                        accept="image/*"
                        onChange={handleImageList}
                        multiple
                    />
                </div>
            </div>

            <div className="space-y-1">
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
            </div>

            <hr />

            <div className="flex flex-row gap-8">
                <div className="w-1/3 space-y-1">
                    <label htmlFor="lunchStep" className="text-lg font-bold">
                        Étape de repas
                    </label>
                    <select
                        id="lunchStep"
                        name="lunchStep"
                        onChange={(e) => {
                            setLunchStep(e.target.value as lunchStep);
                        }}
                        value={lunchStep}
                        className="w-full rounded border text-center outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    >
                        {lunchStepList.map((step, index) => (
                            <option key={index} value={step.enum}>
                                {step.translate}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-1/3 space-y-1">
                    <label htmlFor="lunchType" className="text-lg font-bold">
                        Type de repas
                    </label>
                    <select
                        id="lunchType"
                        name="lunchType"
                        onChange={(e) => setLunchType(e.target.value as lunchType)}
                        value={lunchType}
                        className="w-full rounded border text-center outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    >
                        {lunchTypeList.map((type, index) => (
                            <option key={index} value={type.enum}>
                                {type.translate}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-1/3 space-y-1">
                    <label htmlFor="difficultyLevel" className="text-lg font-bold">
                        Difficulté
                    </label>
                    <select
                        id="difficultyLevel"
                        name="difficultyLevel"
                        onChange={(e) => setDifficultyLevel(e.target.value as difficultyLevel)}
                        value={difficultyLevel}
                        className="w-full rounded border text-center outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    >
                        {difficultyLevelList.map((type, index) => (
                            <option key={index} value={type.enum}>
                                {type.translate}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-row gap-8">
                <div className="w-1/2 space-y-1">
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

                <div className="w-1/2 space-y-1">
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
            </div>

            <hr />

            <div className="w-full space-y-2">
                <h2 className="text-lg font-bold">Choisir les ingrédients</h2>
                <div className="w-full space-y-4">
                    {selectedIngredientList.length > 0 && (
                        <div className="flex flex-row gap-3 overflow-x-auto">
                            {selectedIngredientList.map((ingredient, index) => (
                                <div
                                    key={index}
                                    className="flex min-w-[150px] max-w-[150px] flex-col items-center justify-between gap-4 rounded-md border p-4 lg:flex-row"
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
            </div>

            <hr />

            <div className="space-y-3">
                <div>
                    <div className="text-lg font-bold">Instructions</div>
                    <div className="text-xs italic text-gray-500">
                        Ajouter des instructions les unes après les autres.
                    </div>
                </div>
                {instructionList.map((step) => {
                    const indexTable = instructionList.indexOf(step);
                    return (
                        <div key={indexTable} className="space-y-1">
                            <div className="flex flex-row items-center justify-between">
                                <label htmlFor={`instruction-${indexTable}`} className="font-bold">
                                    Étape {indexTable + 1}
                                </label>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    fontSize="xs"
                                    className="py-1"
                                    onClick={() =>
                                        setInstructionList([...instructionList].filter((_, i) => i !== indexTable))
                                    }
                                >
                                    Retirer cette étape
                                </Button>
                            </div>
                            <textarea
                                id={`instruction-${indexTable}`}
                                name={`instruction-${indexTable}`}
                                className="w-full rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                                onChange={(e) => {
                                    const newInstructionList = [...instructionList];
                                    newInstructionList[indexTable] = e.target.value;
                                    setInstructionList(newInstructionList);
                                }}
                                value={step}
                            />
                        </div>
                    );
                })}
                <div className="w-full text-center">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setInstructionList([...instructionList, ""])}
                    >
                        Ajouter une étape
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <div className="flex w-full flex-row items-center justify-center gap-2">
                    <div className="h-px w-full rounded-full bg-gray-300" />
                    <div className="whitespace-nowrap text-lg font-bold">Envoyer la recette</div>
                    <div className="h-px w-full rounded-full bg-gray-300" />
                </div>
                <div className="text-gray-500">Prenez le temps de vous relire avant de valider 😃</div>
                <FormFeedback mode={mode}>{message}</FormFeedback>
                <LoadingButton className="my-4 px-16 py-1" type="submit" label="Créer la recette" loading={loading} />
            </div>
        </form>
    );
}
