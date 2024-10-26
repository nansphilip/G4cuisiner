import Button from "@comps/client/button";
import ProfileClient from "./client";

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
