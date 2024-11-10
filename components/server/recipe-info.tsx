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
        
    return (
        <div>
            <p>
                <span>Préparation : </span>
                <span className="font-bold">{preparationTime} min</span>
            </p>
            <p>
                <span>Difficulté : </span>
                <span className="font-bold">{difficultyLevelFormatted}</span>
            </p>
            <p>
                <span>Type de repas : </span>
                <span className="font-bold">{lunchTypeFormatted}</span>
            </p>
            <p>
                <span>Étape de repas : </span>
                <span className="font-bold">{lunchStepFormatted}</span>
            </p>
        </div>
    );
}
