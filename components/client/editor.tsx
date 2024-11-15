"use client";

import { useState } from "react";

export default function Editor() {
    const [counterStep, setCounterStep] = useState<number>(1);
    const [stepList, setStepList] = useState<number[]>([]);
    const [inputText, setInputText] = useState<string[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [stepString, setStepString] = useState<string>("");

    const addInputText = (text: string, index: number) => {
        setInputText((prevTexts) => {
            const newTexts = [...prevTexts];
            newTexts[index] = text;
            return newTexts;
        });
    };

    const addStep = () => {
        setCounterStep((prev) => prev + 1);
        setStepList((prevList) => [...prevList, counterStep]);
    };

    const save = () => {
        setIsVisible(false);
        console.log(inputText);
        const stepString = inputText.map((step) => `${step}`).join("@@@@@");
        console.log(stepString);
        setStepString(stepString);
    };

    return (
        <div className="flex w-full flex-col gap-4 rounded-xl border p-4 shadow">
            {isVisible && <h1 className="text-2xl font-bold">Rédiger les étapes de la recette :</h1>}
            {isVisible && (
                <div className="flex w-full flex-col gap-4">
                    {/* Conteneur de composant d'étapes */}
                    {stepList.map((number) => (
                        <StepComponent
                            key={number}
                            numberStep={number}
                            index={number - 1} // Pour aligner avec l'index du tableau `inputText`
                            inputText={inputText}
                            addInputText={addInputText}
                        />
                    ))}
                </div>
            )}
            {isVisible && (
                <div className="flex w-full flex-col items-center justify-between gap-4 lg:flex-row">
                    <AddStepButton addStep={addStep} save={save} />
                </div>
            )}
            {!isVisible && (
                <div className="flex w-full flex-col gap-4">
                    <h1 className="text-2xl font-bold">Etapes de la recette :</h1>
                    {/* Conteneur des etapes formatées */}
                    {inputText.map((step, index) => (
                        <div key={index}>
                            <h1 className="text-xl font-bold">Étape {index + 1} :</h1>
                            <p>{step}</p>
                        </div>
                    ))}
                    <div className="flex w-full items-center justify-center">
                        <button
                            type="button"
                            onClick={() => setIsVisible(true)}
                            className="w-[140px] rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700"
                        >
                            Modifier
                        </button>
                    </div>
                </div>
            )}
            <input className="hidden" name="recipe-step" readOnly value={stepString}></input>
        </div>
    );
}

function StepComponent({
    numberStep,
    index,
    inputText,
    addInputText,
}: {
    numberStep: number;
    index: number;
    inputText: string[];
    addInputText: (text: string, index: number) => void;
}) {
    return (
        <div className="flex h-[150px] flex-col gap-4">
            <h1 className="text-xl font-bold">Étape {numberStep} :</h1>
            <textarea
                onChange={(e) => addInputText(e.target.value, index)}
                className="w-full rounded-md border p-4"
                rows={4}
                placeholder="Entrez votre texte ici"
                value={inputText[index] || ""}
            />
        </div>
    );
}

function AddStepButton({ addStep, save }: { addStep: () => void; save: () => void }) {
    return (
        <>
            <button
                type="button"
                className="m-auto w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700 lg:w-[140px]"
                onClick={addStep}
            >
                Ajouter une étape
            </button>
            <button
                type="button"
                className="m-auto size-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700 lg:w-[140px]"
                onClick={save}
            >
                Enregistrer
            </button>
        </>
    );
}
