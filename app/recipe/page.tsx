
import ButtonClient from "@comps/client/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edit recipe",
    description: "Edit recipe page.",
};

export default async function EditPage() {
    return (
        <>
            <h2 className="text-xl font-bold">Cette page n&apos;existe pas... Tu peux t&apos;en aller.</h2>
            <ButtonClient type="link" href="/" variant="default" buttonSize="lg" fontSize="lg">
                Partir d&apos;ici (recommandé)
            </ButtonClient>
            <ButtonClient type="link" href="/recipe/edit" variant="link">
                Visiter une autre page...
            </ButtonClient>
        </>
    );
}