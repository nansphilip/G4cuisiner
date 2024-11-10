import Image from "next/image";

export type IngredientListProps = {
    ingredient: IngredientType;
};

export default function IngredientListClient(props: IngredientListProps) {
    const { ingredient } = props;

    return (
        <div>
            <p className="font-bold">{ingredient.name}</p>
            <p className="text-xxs">{ingredient.description}</p>
            {ingredient.image && (
                <Image className="object-cover" src={ingredient.image} height={50} width={50} alt={ingredient.name} />
            )}
        </div>
    );
}
