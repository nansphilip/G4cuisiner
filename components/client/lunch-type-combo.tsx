"use client";

import React, { useState } from "react";

export default function LunchTypeCombo() {
    const [lunchType, setLunchType] = useState("BREAKFAST");
    const lunchTypeList: string[][] = [
        ["BREAKFAST", "Petit déjeuner"], ["LUNCH", "Déjeuner"], ["BRUNCH", "Brunch"], ["DINNER", "Dîner"], ["SNACK", "Snack"]];

    const handleClick = (name: string) => {
        setLunchType(name);
    };

    return (
        <label className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-xl font-bold">Sélectionner l&apos;étape de repas : </h2>
            <select
                onChange={(e) => handleClick(e.target.value)}
                className="w-2/3 rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
            >
                {lunchTypeList.map((step,index) => (
                    <option key={index} value={step[0]}>
                        {step[1]}
                    </option>
                ))}
            </select>
            <input className="hidden" name="lunchType" readOnly value={lunchType} />
        </label>
    );
}
