import ButtonClient from "@comps/client/button";
import ZustandGetClient from "./client";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Zustand Get",
    description: "Zustand Get page.",
};

export default function ZustandGetPage() {
    return (
        <>
            <div>
                <span>Switch state is </span>
                <ZustandGetClient />
            </div>
            <div>
                <span>Go back to </span>
                <ButtonClient type="link" variant="link" buttonSize="none" href="/zustand-set">
                    Zustand Set Page
                </ButtonClient>
            </div>
        </>
    );
}
