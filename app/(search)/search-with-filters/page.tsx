import SearchWithFiltersClient from "./SearchWithFiltersClient";
import {
    LunchTypeList,
    LunchStepList,
    IngredientList,
} from "@actions/database/Recipe";

export default async function SearchWithFilters() {
    const lunchTypes = await LunchTypeList();
    const lunchSteps = await LunchStepList();
    const ingredients = await IngredientList();

    return (
        <SearchWithFiltersClient
            lunchTypeList={lunchTypes}
            lunchStepList={lunchSteps}
            ingredientList={ingredients}
        />
    );
}
