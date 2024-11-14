"use client";

import React, { useState } from "react";

const CounterComposant = () => {
    const [number, setNumber] = useState(1);

    const increment = () => {
        setNumber((previous) => previous + 1);
    };

    const decrement = () => {
        setNumber((previous) => (previous > 1 ? previous - 1 : 1));
    };

    return (
        <label className="flex w-full flex-col gap-2">
            <h2 className="text-xl font-bold">Définir le nombre de personnes : </h2>
            <div className="flex w-full items-center justify-center space-x-2">
                <button
                    type="button"
                    className="h-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700"
                    onClick={decrement}
                >
                    -
                </button>
                <input
                    type="number"
                    name="numberOfServing"
                    id="numberInput"
                    className="h-full w-1/4 rounded border border-gray-300 text-center"
                    value={number}
                    readOnly
                />
                <button
                    type="button"
                    className="h-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700"
                    onClick={increment}
                >
                    +
                </button>
            </div>
        </label>
    );
};

export default CounterComposant;
