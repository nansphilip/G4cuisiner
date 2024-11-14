import Image from "next/image";

export type RecipeProps = {
    index: number;
    recipeName: string;
    recipeImageUrl: string;
};

export default function RecipeCard(props: RecipeProps) {
    const { index, recipeName, recipeImageUrl } = props;

    return (
        <div
            key={index}
            className="flex flex-col overflow-hidden rounded-lg border shadow transition-transform duration-150 hover:scale-105"
        >
            <Image
                className="aspect-[5/4] object-cover"
                src={recipeImageUrl}
                height={200}
                width={250}
                alt={recipeName}
            />
        </div>
    );
}
