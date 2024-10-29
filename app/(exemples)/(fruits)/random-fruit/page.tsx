// Composant serveur

import FruitsClient from "./client";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Random fruit",
    description: "Random fruit page.",
}

export default function FruitsPage() {

    return (
        <>
            <p>Click button to dynamically fetch fruits from server.</p>
            <FruitsClient/>
        </>
    );
}
