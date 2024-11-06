import Image from "next/image";

export type RecipeProps = {
    title: string;
    image: string | null;
};

export default function RecipeCard(props: RecipeProps) {
    const { title, image } = props;

    if (!image) {
        return null;
    }

    return (
        <Image
            className="aspect-[5/4] rounded-lg object-cover shadow-md"
            src={image}
            height={200}
            width={250}
            alt={title}
        />
    );
}
