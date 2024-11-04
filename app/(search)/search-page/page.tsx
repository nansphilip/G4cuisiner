import SearchClient from "@app/(search)/search-page/client";
import { SelectEveryRecipeSlugs } from "@actions/database/Recipe";

export default async function SearchPage() {
    const recipeList = await SelectEveryRecipeSlugs();
    return (
        <>
            <div>
                <SearchClient recipeList={recipeList} />
            </div>
        </>
    );
}
