import { CompleteRecipeType } from "@actions/types/Recipe";

type RecipeInfoProps = {
    recipe: CompleteRecipeType;
};

export default function RecipeInfo(props: RecipeInfoProps) {
    const { recipe } = props;
    const { difficultyLevel, lunchType, lunchStep, preparationTime } = recipe;

    // Format data
    const difficultyLevelFormatted =
        (difficultyLevel === "EASY" && "Facile") ||
        (difficultyLevel === "MEDIUM" && "Moyen") ||
        (difficultyLevel === "HARD" && "Difficile");

    const lunchTypeFormatted =
        (lunchType === "BREAKFAST" && "Petit déjeuner") ||
        (lunchType === "BRUNCH" && "Brunch") ||
        (lunchType === "DINNER" && "Dîner") ||
        (lunchType === "LUNCH" && "Déjeuner") ||
        (lunchType === "SNACK" && "Goûter");

    const lunchStepFormatted =
        (lunchStep === "APPETIZER" && "Apéritif") ||
        (lunchStep === "STARTER" && "Entrée") ||
        (lunchStep === "MAIN" && "Plat principal") ||
        (lunchStep === "DESSERT" && "Dessert");
    
    const infoList = [
        { label: "Préparation", value: `${preparationTime} min` },
        { label: "Difficulté", value: difficultyLevelFormatted },
        { label: "Type de repas", value: lunchTypeFormatted },
        { label: "Étape de repas", value: lunchStepFormatted },
    ];

    return (
        <div className="flex flex-row items-stretch justify-between gap-4">
            {infoList.map((info, index) => (
                <div key={index} className="flex h-24 w-1/4 flex-col items-center justify-center rounded-md border">
                    <span className="text-xl font-bold">{info.value}</span>
                    <span className="text-xs text-gray-500">{info.label}</span>
                </div>
            ))}
        </div>
    );
}
