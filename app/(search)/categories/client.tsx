"use client";
import { SelectEveryRecipeType } from "@actions/types/Recipe";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Slider } from "@nextui-org/slider";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

type SearchWithFiltersClientProps = {
    listRecipes: SelectEveryRecipeType[];
};

export default function SearchWithFiltersClient(props: SearchWithFiltersClientProps) {
    const { listRecipes } = props;
    const [recipes, setRecipes] = useState(listRecipes);

    const [filtersLunchType, setFiltersLunchType] = useState<boolean[]>([false, false, false, false, false, true]);

    const [filtersLunchStep, setFiltersLunchStep] = useState([false, false, false, false, true]);

    const [filtersDifficultyLevel, setFiltersDifficultyLevel] = useState([false, false, false, true]);

    const [filtersPreparationTime, setFiltersPreparationTime] = useState<number[]>([5, 240]);

    const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name } = e.target;
        if (name === "lunchType") {
            const newFilters = filtersLunchType.map((_, idx) => idx === index);
            setFiltersLunchType(newFilters);
        } else if (name === "lunchStep") {
            const newFilters = filtersLunchStep.map((_, idx) => idx === index);
            setFiltersLunchStep(newFilters);
        } else if (name === "difficultyLevel") {
            const newFilters = filtersDifficultyLevel.map((_, idx) => idx === index);
            setFiltersDifficultyLevel(newFilters);
        }
    };

    useEffect(() => {
        const filteredRecipes = listRecipes.filter((recipe) => {
            const isLunchTypeFilterActive = filtersLunchType.some((value) => value);
            const lunchType = isLunchTypeFilterActive
                ? (recipe.lunchType === "BREAKFAST" && filtersLunchType[0]) ||
                  (recipe.lunchType === "LUNCH" && filtersLunchType[1]) ||
                  (recipe.lunchType === "BRUNCH" && filtersLunchType[2]) ||
                  (recipe.lunchType === "DINNER" && filtersLunchType[3]) ||
                  (recipe.lunchType === "SNACK" && filtersLunchType[4]) ||
                  filtersLunchType[5]
                : true;

            const isLunchStepFilterActive = filtersLunchStep.some((value) => value);
            const lunchStep = isLunchStepFilterActive
                ? (recipe.lunchStep === "APPETIZER" && filtersLunchStep[0]) ||
                  (recipe.lunchStep === "STARTER" && filtersLunchStep[1]) ||
                  (recipe.lunchStep === "MAIN" && filtersLunchStep[2]) ||
                  (recipe.lunchStep === "DESSERT" && filtersLunchStep[3]) ||
                  filtersLunchStep[4]
                : true;

            const isDifficultyLevelFilterActive = filtersDifficultyLevel.some((value) => value);
            const difficultyLevel = isDifficultyLevelFilterActive
                ? (recipe.difficultyLevel === "EASY" && filtersDifficultyLevel[0]) ||
                  (recipe.difficultyLevel === "MEDIUM" && filtersDifficultyLevel[1]) ||
                  (recipe.difficultyLevel === "HARD" && filtersDifficultyLevel[2]) ||
                  filtersDifficultyLevel[3]
                : true;

            const preparationTime =
                recipe.preparationTime >= filtersPreparationTime[0] &&
                recipe.preparationTime <= filtersPreparationTime[1];
            return lunchType && lunchStep && difficultyLevel && preparationTime;
        });
        setRecipes(filteredRecipes);
    }, [filtersLunchStep, filtersPreparationTime, filtersLunchType, filtersDifficultyLevel, listRecipes]);

    return (
        <div className="flex flex-col gap-3 items-center rounded-xl h-full bg-gray-100 p-6">
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3">
                <fieldset className="rounded-lg border border-gray-300 bg-white p-4 shadow-md">
                    <legend className="text-lg font-semibold">Type de repas</legend>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchType"
                            id="resetLunchType"
                            onChange={(e) => handleChangeRadio(e, 5)}
                            checked={filtersLunchType[5]}
                            className="mr-2"
                        />
                        <label htmlFor="resetLunchType">Tous</label>
                    </div>
                    <hr className="my-2"/>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchType"
                            id="breakfast"
                            onChange={(e) => handleChangeRadio(e, 0)}
                            checked={filtersLunchType[0]}
                            className="mr-2"
                        />
                        <label htmlFor="breakfast" className="text-gray-700">
                            Petit-déjeuner
                        </label>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchType"
                            id="lunch"
                            onChange={(e) => handleChangeRadio(e, 1)}
                            checked={filtersLunchType[1]}
                            className="mr-2"
                        />
                        <label htmlFor="lunch" className="text-gray-700">
                            Déjeuner
                        </label>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchType"
                            id="brunch"
                            onChange={(e) => handleChangeRadio(e, 2)}
                            checked={filtersLunchType[2]}
                            className="mr-2"
                        />
                        <label htmlFor="brunch">Brunch</label>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchType"
                            id="dinner"
                            onChange={(e) => handleChangeRadio(e, 3)}
                            checked={filtersLunchType[3]}
                            className="mr-2"
                        />
                        <label htmlFor="dinner">Dîner</label>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchType"
                            id="snack"
                            onChange={(e) => handleChangeRadio(e, 4)}
                            checked={filtersLunchType[4]}
                            className="mr-2"
                        />
                        <label htmlFor="snack">Snack</label>
                    </div>
                </fieldset>
                <fieldset className="rounded-lg border border-gray-300 bg-white p-4 shadow-md">
                    <legend className="text-lg font-semibold">Etape du repas</legend>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchStep"
                            id="resetLunchStep"
                            onChange={(e) => handleChangeRadio(e, 4)}
                            checked={filtersLunchStep[4]}
                            className="mr-2"
                        />
                        <label htmlFor="resetLunchStep">Tous</label>
                    </div>
                    <hr className="my-2" />
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchStep"
                            id="appetizer"
                            onChange={(e) => handleChangeRadio(e, 0)}
                            checked={filtersLunchStep[0]}
                            className="mr-2"
                        />
                        <label htmlFor="appetizer">Apéritif</label>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchStep"
                            id="starter"
                            onChange={(e) => handleChangeRadio(e, 1)}
                            checked={filtersLunchStep[1]}
                            className="mr-2"
                        />
                        <label htmlFor="starter">Entrée</label>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchStep"
                            id="main"
                            onChange={(e) => handleChangeRadio(e, 2)}
                            checked={filtersLunchStep[2]}
                            className="mr-2"
                        />
                        <label htmlFor="main">Plat</label>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="lunchStep"
                            id="dessert"
                            onChange={(e) => handleChangeRadio(e, 3)}
                            checked={filtersLunchStep[3]}
                            className="mr-2"
                        />
                        <label htmlFor="dessert">Dessert</label>
                    </div>
                </fieldset>
                <fieldset className="rounded-lg border border-gray-300 bg-white p-4 shadow-md">
                    <legend className="text-lg font-semibold">Difficulté</legend>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="difficultyLevel"
                            id="resetDifficultyLevel"
                            onChange={(e) => handleChangeRadio(e, 3)}
                            checked={filtersDifficultyLevel[3]}
                            className="mr-2"
                        />
                        <label htmlFor="resetDifficultyLevel">Tous</label>
                    </div>
                    <hr className="my-2" />
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="difficultyLevel"
                            id="easy"
                            onChange={(e) => handleChangeRadio(e, 0)}
                            checked={filtersDifficultyLevel[0]}
                            className="mr-2"
                        />
                        <label htmlFor="easy">Facile</label>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="difficultyLevel"
                            id="medium"
                            onChange={(e) => handleChangeRadio(e, 1)}
                            checked={filtersDifficultyLevel[1]}
                            className="mr-2"
                        />
                        <label htmlFor="medium">Moyen</label>
                    </div>
                    <div className="flex items-center cursor-pointer">
                        <input
                            type="radio"
                            name="difficultyLevel"
                            id="hard"
                            onChange={(e) => handleChangeRadio(e, 2)}
                            checked={filtersDifficultyLevel[2]}
                            className="mr-2"
                        />
                        <label htmlFor="hard">Difficile</label>
                    </div>
                </fieldset>
                <fieldset className="flex flex-col line-clamp-1 whitespace-nowrap items-center justify-around rounded-lg border border-gray-300 bg-white p-4 shadow-md">
                    <legend className="text-lg font-semibold">Temps préparation</legend>
                    <Slider
                        id="preparationTime"
                        step={5}
                        minValue={5}
                        maxValue={240}
                        formatOptions={{
                            style: "unit",
                            unit: "minute",
                            unitDisplay: "short",
                        }}
                        className="max-w-md"
                        value={[filtersPreparationTime[0], filtersPreparationTime[1]]}
                        onChange={(value: number | number[]) => {
                            if (Array.isArray(value)) {
                                setFiltersPreparationTime([value[0], value[1]]);
                            }
                        }}
                    />
                    <label htmlFor="preparationTime" className="mt-2 text-gray-700">
                        {filtersPreparationTime[0]} - {filtersPreparationTime[1]} Minutes
                    </label>
                </fieldset>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {recipes.map((recipe, index) => {
                    const difficultyLevelFormatted =
                        (recipe.difficultyLevel === "EASY" && "Facile") ||
                        (recipe.difficultyLevel === "MEDIUM" && "Moyen") ||
                        (recipe.difficultyLevel === "HARD" && "Difficile");

                    const lunchTypeFormatted =
                        (recipe.lunchType === "BREAKFAST" && "Petit déjeuner") ||
                        (recipe.lunchType === "BRUNCH" && "Brunch") ||
                        (recipe.lunchType === "DINNER" && "Dîner") ||
                        (recipe.lunchType === "LUNCH" && "Déjeuner") ||
                        (recipe.lunchType === "SNACK" && "Goûter");

                    const lunchStepFormatted =
                        (recipe.lunchStep === "APPETIZER" && "Apéritif") ||
                        (recipe.lunchStep === "STARTER" && "Entrée") ||
                        (recipe.lunchStep === "MAIN" && "Plat principal") ||
                        (recipe.lunchStep === "DESSERT" && "Dessert");
                    return (
                        <Link href={`recipe/${recipe.slug}`} key={index}>
                            <Card>
                                <CardHeader className="flex flex-col pb-0">
                                    <h4 className="text-large font-bold text-black">{recipe.title}</h4>
                                    <div className="flex flex-row gap-2">
                                        <span className="text-xs text-default-500">{lunchTypeFormatted}</span>
                                        <span className="text-xs text-default-500">{lunchStepFormatted}</span>
                                        <span className="text-xs text-default-500">{difficultyLevelFormatted}</span>
                                    </div>
                                </CardHeader>
                                <CardBody className="flex">
                                    <Image
                                        alt="Card background"
                                        className="aspect-[4/3] rounded-xl
                                        object-cover"
                                        width={300}
                                        height={200}
                                        layout="responsive"
                                        src={recipe.imageList[0].url}
                                    />
                                </CardBody>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
