"use client";

import { combo } from "@lib/combo";
import Image from "next/image";
import { useState } from "react";

export type RecipeProps = {
    imageList: {
        url: string;
        alt: string;
    }[];
    className?: string;
};

export default function RecipeImageListClient(props: RecipeProps) {
    const { imageList, className } = props;

    const imageTemplate = "/template.webp";
    const [imageLoadList, setImageLoadList] = useState<{ url: string; alt: string }[]>(
        imageList.map((recipe) => {
            return {
                url: recipe.url ?? imageTemplate,
                alt: recipe.alt,
            };
        })
    );

    return (
        <div className={combo("flex flex-row gap-3 overflow-x-auto", className)}>
            {imageLoadList.map(({ url, alt }, index) => (
                <Image
                    key={index}
                    className={"aspect-[5/4] rounded-lg object-cover"}
                    src={url}
                    onError={() => {
                        const newImageList = [...imageLoadList];
                        newImageList[index] = {url: imageTemplate, alt};
                        setImageLoadList(newImageList);
                    }}
                    height={200}
                    width={250}
                    alt={alt}
                />
            ))}
        </div>
    );
}
