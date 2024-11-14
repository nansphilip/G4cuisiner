import ButtonClient from "@comps/client/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edit recipe",
    description: "Edit recipe page.",
};

export default async function EditPage() {
    return (
        <>
            <h2 className="text-xl font-bold">Cette page n&apos;existe pas, alors dégage !</h2>
            <ButtonClient type="link" href="/" variant="danger" buttonSize="lg" fontSize="lg">
                S&apos;enfuir très loin en courant
            </ButtonClient>
            <ButtonClient type="link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" variant="link">
                Ne pas cliquer ici, merci.
            </ButtonClient>
        </>
    );
}
