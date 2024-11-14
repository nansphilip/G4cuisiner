import ButtonClient from "@comps/client/button";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Verify",
    description: "Verify page.",
}

export default async function VerifyPage() {

    return <>
        <p>Cette page n&apos;est pas disponible pour le moment.</p>
        <ButtonClient type="link" href="/" variant="outline">Retour Accueil</ButtonClient>
    </>
}