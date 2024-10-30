import Button from "@comps/client/button";
import EditClient from "./client";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Edit recipe",
    description: "Edit recipe page.",
}

export default async function EditPage() {

    return (
        <>
            <p>Cette page n&apos;est pas disponible pour le moment.</p>
            <Button type="link" href="/" variant="outline">
                Retour Accueil
            </Button>
            <EditClient />
        </>
    );
}
