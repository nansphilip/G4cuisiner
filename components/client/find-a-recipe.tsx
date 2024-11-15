import Image from "next/image";
import Rating from "./rating-recipe";
import ButtonClient from "@comps/client/button";

export type RecipeProps = {
    index: string;
    slug: string;
    description: string;
    recipeImageUrl: string | null;
    ratingAverage: number;
};

export default function FindRecipeCard(props: RecipeProps) {
    const { index, slug, description, recipeImageUrl, ratingAverage } = props;

    return (
        <div
            key={index}
            className="flex w-2/3 flex-col overflow-hidden rounded-lg border shadow transition-transform duration-150 hover:scale-105"
        >
            <div className="shrink-0">
                <Image className="size-full object-cover" src={recipeImageUrl} alt={slug} width={250} height={200} />
            </div>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-row justify-between">
                    <p className="text-black-500 text-xl font-bold">{slug}</p>
                    <Rating rating={ratingAverage} />
                </div>
                <p className="text-xs text-gray-500">{description}</p>

                <div className="flex flex-row items-center justify-center">
                    <ButtonClient type="link" href={`recipe/${slug}`}>
                        Accéder à la recette
                    </ButtonClient>
                </div>
            </div>
        </div>
    );
}
