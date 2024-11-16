import Button from "@comps/server/button";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Reset password",
    description: "Reset password page.",
}

export default async function ResetPage() {

    const session = await getSession();
    if (session) redirect("/dashboard");

    return <>
        <p>Cette page n&apos;est pas disponible pour le moment.</p>
        <Button type="link" href="/" variant="outline">Retour Accueil</Button>
    </>
}