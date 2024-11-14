import ButtonClient from "@comps/client/button";
import ZustandSetClient from "./client";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Zustand Set",
    description: "Zustand Set page.",
}

export default function ZustandSetPage() {

    return (
        <>
            <div className="flex items-center gap-4">
                <ZustandSetClient/>
            </div>
            <div>
                <span>Go to </span>
                <ButtonClient type="link" variant="link" buttonSize="none" href="/zustand-get">
                    Zustand Get Page
                </ButtonClient>
                <span> to see result</span>
            </div>
        </>
    );
}
