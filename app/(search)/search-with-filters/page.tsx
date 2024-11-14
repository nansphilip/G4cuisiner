import SearchWithFiltersClient from "./client";
import { getRecipesToFilter } from "@actions/database/Recipe";

export default async function SearchWithFiltersPage() {
    const listRecipes = await getRecipesToFilter();
    return (
        <>
            <form className="size-full">
                <SearchWithFiltersClient listRecipes={listRecipes} />
            </form>
        </>
    );
}
