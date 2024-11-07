import { combo } from "@lib/combo";
import Image from "next/image";

export type RecipeProps = {
    title: string;
    imageUrlList: string[];
    className?: string;
};

export default function RecipeImageListClient(props: RecipeProps) {
    const { title, imageUrlList, className } = props;

    if (imageUrlList.length === 0) {
        return null;
    }

    return (
        <div className={combo("flex flex-row gap-3 overflow-auto", className)}>
            {imageUrlList.map((imageUrl, index) => (
                <Image
                    key={index}
                    className={"aspect-[5/4] rounded-lg object-cover shadow-md"}
                    src={imageUrl}
                    height={200}
                    width={250}
                    alt={title}
                />
            ))}
        </div>
    );
}
