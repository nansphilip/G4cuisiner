/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { SelectRecipeByFilter } from "@actions/database/Recipe";
import QuestionCard from "@comps/client/questionnaire";
import { useState } from "react";
import { LunchStep, LunchType } from "@prisma/client";
import Button from "@comps/client/button";
import { ReturnSelectRecipeByFilterType } from "@actions/types/Recipe";
import FindRecipeCard from "@comps/client/find-a-recipe";

export default function QuestionaryClient() {
    const [isVisible, setIsVisible] = useState(true);
    const [hasCompleted, setHasCompleted] = useState(false);
    const [slugList, setSlugList] = useState<ReturnSelectRecipeByFilterType[] | null>([]);
    const [generatedRecipe, setGeneratedRecipe] = useState<number>(1);

    const handleClickBegin = () => {
        setIsVisible(false);
    };

    const handleComplete = (recipes: string[]) => {
        setHasCompleted(true); // Marque comme terminé
        // Appel de la fonction qui va gérer les réponses
        handleUsersRecipes(recipes);
    };

    return (
        <>
            {isVisible && (
                <div id="conteneur-begin" className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-center text-3xl font-bold">Trouvons un plat à cuisiner!</h1>
                    <p className="max-w-[500px] text-center text-lg">
                        Tu as faim, tu es motivé à cuisiner un bon petit plat mais tu n&apos;as pas d&apos;idée de
                        recette ? Laisse toi guider !
                    </p>
                    <button
                        className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
                        onClick={handleClickBegin}
                    >
                        C&apos;est parti !
                    </button>
                </div>
            )}

            {!isVisible && !hasCompleted && <QuestionCard onComplete={handleComplete} />}
            {hasCompleted && (
                <div className="text-center">
                    <h2 className="p-3 text-center text-lg font-bold">Merci d&apos;avoir répondu aux questions !</h2>
                    <p className="p-3 text-center text-xl">
                        Voici une liste de recettes correspondant à votre recherche :
                    </p>
                    <div className="m-4 flex items-center justify-center gap-4">
                        {slugList ? (
                            slugList
                                .slice(0, generatedRecipe)
                                .map((recipe, index) => <FindRecipeCard key={index} recipe={recipe} />)
                        ) : (
                            <p className="text-center">Aucune recette ne correspond à votre recherche.</p>
                        )}
                    </div>
                    <div>
                        {slugList && generatedRecipe < slugList.length && (
                            <Button type="button" variant="outline" onClick={handleClickGenerate}>
                                Voir une autre recette
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </>
    );

    function handleClickGenerate() {
        setGeneratedRecipe((prevCount) => Math.min(prevCount + 1, slugList ? slugList.length : 0));
    }

    function handleUsersRecipes(recipes: string[]) {
        let filtreLunchType: LunchType[] = [];
        let filtrePreparationTime: number = 0;
        let filtreLunchStep: LunchStep[] = [];

        recipes.map((recipe) => {
            //1ere question
            switch (recipe) {
                case "Le midi":
                    filtreLunchType = [LunchType.LUNCH];
                    return "MIDI";
                case "Le soir":
                    filtreLunchType = [LunchType.DINNER];
                    return "SOIR";
                case "Raté, c'est à un autre moment":
                    filtreLunchType = [LunchType.SNACK, LunchType.BREAKFAST, LunchType.BRUNCH];
                    return "RATE";
                case "Du salé":
                    filtreLunchStep = [LunchStep.APPETIZER, LunchStep.STARTER, LunchStep.MAIN];
                    return "SALE";
                case "Du sucré":
                    filtreLunchStep = [LunchStep.DESSERT];
                    return "SUCRE";
                case "Pressé, et j'ai faim !":
                    filtrePreparationTime = 30;
                    return "PRESSE";
                case "J'ai tout mon temps !":
                    filtrePreparationTime = 100;
                    return "TOUT";
                default:
                    return "ERREUR";
            }
        });
        // Appel de la fonction qui va filtrer les recettes et récupération de la liste de recettes
        filterRecipes(filtreLunchType, filtreLunchStep, filtrePreparationTime);

        //Appel de la fonction qui va filtrer les recettes
        async function filterRecipes(lunchType: LunchType[], lunchStep: LunchStep[], preparationTime: number) {
            const recipeList = await SelectRecipeByFilter({ lunchType, lunchStep, preparationTime });
            setSlugList(recipeList);
        }
    }
}
