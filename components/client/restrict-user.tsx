"use client";

import { useState } from "react";
import { combo } from "@lib/combo";
import { UpdateUser } from "@actions/database/User";

type RestrictProps = {
    initialRestricted: boolean;
    userId: string; // Permet également une valeur undefined
    classDiv?: string;
    classButton?: string;
};

export default function RestrictClient({ initialRestricted, userId, classDiv }: RestrictProps) {
    const [isRestricted, setIsRestricted] = useState<boolean>(initialRestricted);

    const toggleRestriction = async () => {
        await UpdateUser({
            userId,
            data: { restricted: !isRestricted },
        });

        setIsRestricted(!isRestricted);
    };

    return (
        <div className={classDiv}>
            <button
                onClick={toggleRestriction}
                className={combo(
                    "rounded px-4 py-1 w-full text-nowrap",
                    isRestricted
                        ? "bg-gray-50 text-gray-500 hover:bg-gray-200"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                )}
            >
                {isRestricted ? "Dé-restreindre" : "Restreindre"}
            </button>
        </div>
    );
}
