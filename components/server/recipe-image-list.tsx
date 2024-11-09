import { combo } from "@lib/combo";
import Image from "next/image";

export type RecipeProps = {
    imageList: {
        url: string;
        alt: string;
    }[];
    className?: string;
};

export default function RecipeImageListClient(props: RecipeProps) {
    const { imageList, className } = props;

    if (imageList.length === 0) {
        return null;
    }

    return (
        <div className={combo("flex flex-row gap-3 overflow-auto", className)}>
            {imageList.map(({url, alt}, index) => (
                <Image
                    key={index}
                    className={"aspect-[5/4] rounded-lg object-cover shadow-md"}
                    src={url}
                    height={200}
                    width={250}
                    alt={alt}
                />
            ))}
        </div>
    );
}
