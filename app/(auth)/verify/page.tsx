import Button from "@comps/client/button";

export default async function VerifyPage() {

    return <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
        <p>Cette page n&apos;est pas disponible pour le moment.</p>
        <Button type="link" href="/" variant="outline">Retour Accueil</Button>
    </main>
}