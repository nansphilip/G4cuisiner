"use client";

import React, { useState } from "react";

type SearchFavoriteClientProps = {
    onSearch: (query: string) => void;
};

export default function SearchFavoriteClient(props: SearchFavoriteClientProps) {
    const { onSearch } = props;

    const [query, setQuery] = useState<string>("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <div className="flex w-full items-center rounded-lg bg-gray-100 p-2">
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Rechercher dans vos favoris..."
                className="w-full rounded-md bg-white px-4 py-2 outline-none"
            />
        </div>
    );
}
