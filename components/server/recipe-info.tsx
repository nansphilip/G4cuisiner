import { CompleteRecipeType } from "@actions/types/Recipe";
import StarRating from "@comps/client/difficulty";

type RecipeInfoProps = {
    recipe: CompleteRecipeType;
};

export default function RecipeInfo(props: RecipeInfoProps) {
    const { recipe } = props;
    const { difficultyLevel, lunchType, lunchStep, preparationTime } = recipe;

    // Format data
    const difficultyLevelFormatted =
        ((difficultyLevel === "EASY" && 1) || (difficultyLevel === "MEDIUM" && 2) || (difficultyLevel === "HARD" && 3)) as number;

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
        { label: "Type de repas", value: lunchTypeFormatted },
        { label: "Étape de repas", value: lunchStepFormatted },
    ];

    return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {infoList.map((info, index) => (
                <div key={index} className="flex h-32 flex-col items-center justify-center rounded-md border">
                    <span className="text-xl font-bold">{info.value}</span>
                    <span className="text-xs text-gray-500">{info.label}</span>
                </div>
            ))}
            <div className="flex h-32 w-full flex-col items-center justify-center rounded-md border">
                <StarRating number={difficultyLevelFormatted} editable={false} />
            </div>
        </div>
    );
}
