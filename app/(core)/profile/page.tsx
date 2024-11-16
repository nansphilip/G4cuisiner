import Button from "@comps/server/button";
import ProfileClient from "./client";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Profile",
    description: "Profile page.",
}

export default async function ProfilePage() {

    return (
        <>
            <p>Cette page n&apos;est pas disponible pour le moment.</p>
            <Button type="link" href="/" variant="outline">
                Retour Accueil
            </Button>
            <ProfileClient />
        </>
    );
}
