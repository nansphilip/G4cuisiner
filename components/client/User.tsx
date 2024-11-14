"use client";

import { UpdateUserRestriction } from "@actions/database/User";
import { useState } from "react";
import { combo } from "@lib/combo";

type RestrictProps = {
    initialRestricted: boolean;
    userId: string;  // Permet également une valeur undefined
    classDiv?: string;
    classButton?: string;
};

export default function RestrictClient({ initialRestricted, userId, classDiv }: RestrictProps) {
    const [isRestricted, setIsRestricted] = useState<boolean>(initialRestricted);

    const toggleRestriction = async () => {
         // Met à jour la restriction dans la base de données
        await UpdateUserRestriction({
            userId: userId,  // Convertit userId en string en toute sécurité
            restricted: !isRestricted,
        });

        // Met à jour l'état local
        setIsRestricted(!isRestricted);
    };

    return (
        <div className={classDiv}>
            <button
                onClick={toggleRestriction}
                className={combo("rounded px-4 py-1 w-full", isRestricted ? "bg-gray-50 text-gray-500 hover:bg-gray-200" : "bg-gray-200 text-gray-700 hover:bg-gray-300")}
            >
                {isRestricted ? "Unrestrict" : "Restrict"}
            </button>
        </div>
    );
}
