"use client";

import React from "react";
import { RecipeSteps } from "@actions/types/RecipeStep";


type RecipeStepsProps = {
    steps: RecipeSteps[];
};

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
    if (!steps || steps.length === 0) {
        return <p>Aucune étape disponible.</p>;
    }

    return (
        <div>
            <h3 className="font-bold mt-4">Étapes :</h3>
            <ol className="list-decimal ml-4">
                {steps.map((step) => (
                    <li key={step.stepNumber}>{step.stepDescription}</li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeSteps;