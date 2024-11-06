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
      Définir le nombre de personnes :
      <div className="flex w-full items-center space-x-2">
        <button
          type="button"
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
          onClick={decrement}
        >
          -
        </button>
        <input
          type="number"
          name="numberOfServing"
          id="numberInput"
          className="h-11 w-16 rounded border border-gray-300 text-center"
          value={number}
          readOnly
        />
        <button
          type="button"
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
          onClick={increment}
        >
          +
        </button>
      </div>
    </label>
  );
};

export default CounterComposant;
