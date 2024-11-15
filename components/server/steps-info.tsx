import { CompleteRecipeType } from "@actions/types/Recipe";

type RecipeInfoProps = {
    recipe: CompleteRecipeType;
};

export default function StepsInfo(props: RecipeInfoProps) {
    const { recipe } = props;
    const { Steps } = recipe;
    return (
        <div>
            {Steps.split("@@@@@").map((step, index) => {
                return (
                    // Ajoutez le 'return' ici
                    <div key={index}>
                        <span className="font-semibold">Etape {index + 1} : </span>
                        <span>{step}</span>
                    </div>
                );
            })}
        </div>
    );
}
