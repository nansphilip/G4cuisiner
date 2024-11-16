
import Button from "@comps/server/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Edit recipe",
    description: "Edit recipe page.",
};

export default async function EditPage() {
    return (
        <>
            <h2 className="text-xl font-bold">Cette page n&apos;existe pas... Tu peux t&apos;en aller.</h2>
            <Button type="link" href="/" variant="default" buttonSize="lg" fontSize="lg">
                Partir d&apos;ici (recommandé)
            </Button>
            <Button type="link" href="/recipe/edit" variant="link">
                Visiter une autre page...
            </Button>
        </>
    );
}