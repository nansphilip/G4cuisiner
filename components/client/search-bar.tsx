"use client";

import { useState, useCallback, useMemo } from "react";
import { TitleAndSlugRecipeType } from "@actions/types/Recipe";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

interface SearchBarProps {
    recipeList: TitleAndSlugRecipeType[];
    className?: string;
}

export default function SearchClient(props: SearchBarProps) {
    const { recipeList, className } = props;

    const [search, setSearch] = useState("");

    useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    const normalizeString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const recipeFiltered = useMemo(() => {
        return recipeList.filter((recipe) =>
            normalizeString(recipe.title).toLowerCase().includes(normalizeString(search).toLowerCase())
        );
    }, [recipeList, search]);

    return (
        <>
            <Autocomplete className={className} label="Recherche de recette">
                {recipeFiltered.map((recipe) => (
                    <AutocompleteItem key={recipe.slug} value={recipe.slug} href={`/recipe/${recipe.slug}`}>
                        {recipe.title}
                    </AutocompleteItem>
                ))}
            </Autocomplete>
        </>
    );
}
