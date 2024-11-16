import SearchWithFiltersClient from "./client";
import { SelectEveryRecipe } from "@actions/database/Recipe";

export default async function SearchWithFiltersPage() {
    const listRecipes = await SelectEveryRecipe();
    
    if (!listRecipes) {
        return <div className="flex flex-col items-center justify-center gap-2">
            <span className="font-bold text-xl">Mmm bizarre...</span>
            <span>Il semblerait qu&apos;il qu&apos;y ait pas une seule recette sur ce site...</span>
    </div>;
    }
    
    return (
        <>
            <form className="size-full">
                <SearchWithFiltersClient listRecipes={listRecipes} />
            </form>
        </>
    );
}
