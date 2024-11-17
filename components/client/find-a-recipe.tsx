"use client";

import Image from "next/image";
import Button from "@comps/server/button";
import { ReturnSelectRecipeByFilterType } from "@actions/types/Recipe";
import RatingDisplayAverageClient from "./rating-display-average";

export type RecipeProps = {
    recipe: ReturnSelectRecipeByFilterType;
};

export default function FindRecipeCard(props: RecipeProps) {
    const { recipe } = props;
    const { title, slug, description, ratingAverage, imageList } = recipe;

    const imageTemplate = "/template.webp";

    return (
        <div className="flex w-2/3 flex-col overflow-hidden rounded-lg border shadow transition-transform duration-150 hover:scale-105">
            <div className="shrink-0">
                <Image
                    className="size-full object-cover"
                    src={imageList[0].url ?? imageTemplate}
                    alt={slug}
                    width={250}
                    height={200}
                />
            </div>
            <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-row justify-between">
                    <p className="text-xl font-bold text-gray-500">{title}</p>
                    <RatingDisplayAverageClient ratingAverage={ratingAverage} />
                </div>
                <p className="text-xs text-gray-500">{description}</p>

                <div className="flex flex-row items-center justify-center">
                    <Button type="link" href={`recipe/${slug}`}>
                        Accéder à la recette
                    </Button>
                </div>
            </div>
        </div>
    );
}
