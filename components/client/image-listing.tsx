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
    isHomePage?: boolean;
};

export default function RecipeImageListClient(props: RecipeProps) {
    const { imageList, isHomePage, className } = props;

    const imageTemplate = "/template.webp";
    const [imageLoadList, setImageLoadList] = useState<{ url: string; alt: string }[]>(
        imageList.map((recipe) => {
            return {
                url: recipe.url ?? imageTemplate,
                alt: recipe.alt,
            };
        })
    );
    // const recipeList = await SelectEveryRecipeSlugs();
    const [currentIndex, setCurrentIndex] = useState(0);

    if (isHomePage) {
        return (
            imageLoadList[currentIndex] && (
                <div>
                    <Image
                        key={currentIndex}
                        className="aspect-[5/4] w-full rounded-lg object-cover"
                        src={imageLoadList[currentIndex].url}
                        alt={imageLoadList[currentIndex].alt}
                        height={200}
                        width={250}
                        onError={() => {
                            const newImageList = [...imageLoadList];
                            newImageList[currentIndex] = {
                                url: imageTemplate,
                                alt: imageLoadList[currentIndex].alt,
                            };
                            setImageLoadList(newImageList);
                        }}
                    />

                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                        {imageLoadList.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`size-3 rounded-full bg-white ${
                                    currentIndex === index ? "bg-gray-700 opacity-100" : "bg-gray-300 opacity-50"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )
        );
    }

    return (
        <div className={combo("flex flex-row gap-3 overflow-x-auto", className)}>
            {imageLoadList.map(({ url, alt }, index) => (
                <Image
                    key={index}
                    className={"aspect-[5/4] rounded-lg object-cover"}
                    src={url}
                    onError={() => {
                        const newImageList = [...imageLoadList];
                        newImageList[index] = { url: imageTemplate, alt };
                        setImageLoadList(newImageList);
                    }}
                    height={200}
                    width={250}
                    alt={alt}
                    priority
                />
            ))}
        </div>
    );
}
