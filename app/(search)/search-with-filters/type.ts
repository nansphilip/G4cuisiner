export interface RecipeResult {
    id: string;
    title: string;
    description: string;
    slug: string;
}

export interface ResultsSearchProps {
    results: RecipeResult[];
}

export interface SearchWithFiltersClientProps {
    lunchTypeList: { id: number; name: string }[];
    lunchStepList: { id: number; name: string }[];
    ingredientList: { id: number | string; name: string }[];
}

export interface FilterRecipeProps {
    data: { id: number | string; name: string }[];
    legend: string;
    property: string;
    setResults: (results: RecipeResult[]) => void;
}
