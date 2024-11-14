import { CompleteRecipeType } from "@actions/types/Recipe";

type RecipeInfoProps = {
    recipe: CompleteRecipeType;
};

export default function StepsInfo(props: RecipeInfoProps) {
    const { recipe } = props;
    const { Steps } = recipe;
    console.log(Steps);
    return (
        <div>
            {Steps.split("@@@@@").map((step, index) => {
                return (
                    // Ajoutez le 'return' ici
                    <div key={index}>
                        <h3 className="text-xl font-bold">Etape {index + 1}</h3>
                        <p>{step}</p>
                    </div>
                );
            })}
        </div>
    );
}
