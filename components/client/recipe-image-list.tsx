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
    isFavoritePage?: boolean;
};

export default function RecipeImageListClient(props: RecipeProps) {
    const { imageList, className, isHomePage, isFavoritePage } = props;

    const imageTemplate = "/template.webp";

    const [imageLoadList, setImageLoadList] = useState<{ url: string; alt: string }[]>(
        imageList.map((recipe) => ({
            url: recipe.url ?? imageTemplate,
            alt: recipe.alt,
        }))
    );

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };
    return (
        <div className={combo("relative", className)}>
            {/* Affiche les images pour la page de recette */}
            {!isHomePage && !isFavoritePage ? (
                <div className="flex flex-row gap-3 overflow-x-auto">
                    {imageLoadList.map(({ url, alt }, index) => (
                        <Image
                            key={index}
                            className="aspect-[5/4] rounded-lg object-cover"
                            src={url}
                            alt={alt}
                            height={200}
                            width={250}
                            onError={() => {
                                const newImageList = [...imageLoadList];
                                newImageList[index] = {
                                    url: imageTemplate,
                                    alt: alt,
                                };
                                setImageLoadList(newImageList);
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    <Image
                        key={currentIndex}
                        className="aspect-[5/4] rounded-lg object-cover"
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

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {imageLoadList.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full bg-white ${currentIndex === index ? "bg-gray-700" : "bg-opacity-50"}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
