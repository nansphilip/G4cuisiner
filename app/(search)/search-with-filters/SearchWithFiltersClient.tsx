"use client";

import { useState } from "react";
import FilterRecipeCheckbox from "@app/(search)/search-with-filters/filter-recipe-checkbox";
import ResultsSearch from "@app/(search)/search-with-filters/results-search";
import {
    RecipeResult,
    SearchWithFiltersClientProps,
} from "@app/(search)/search-with-filters/type";
import FilterRecipeSlide from "./filter-recipe-slide";

export default function SearchWithFiltersClient({
    lunchTypeList,
    lunchStepList,
    ingredientList,
}: SearchWithFiltersClientProps) {
    const [results, setResults] = useState<RecipeResult[]>([]);

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="mb-4 flex flex-wrap justify-between">
                    <FilterRecipeCheckbox
                        data={lunchTypeList}
                        legend="Quel moment de la journée ?"
                        property="LunchType"
                        setResults={setResults}
                    />
                    <FilterRecipeCheckbox
                        data={lunchStepList}
                        legend="Quelle étape du repas ?"
                        property="LunchStep"
                        setResults={setResults}
                    />
                    <FilterRecipeCheckbox
                        data={ingredientList}
                        legend="Quels ingrédients voulez-vous utiliser ?"
                        property="Ingredient"
                        setResults={setResults}
                    />
                    <FilterRecipeSlide setResults={setResults} />
                </div>
                <ResultsSearch results={results} />
            </div>
        </>
    );
}
