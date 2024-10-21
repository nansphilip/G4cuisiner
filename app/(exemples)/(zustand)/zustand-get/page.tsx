"use client";

import Button from "@comps/client/button";
import ZustandGetClient from "./client";

export default function ZustandGetPage() {

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 overflow-y-auto px-6 pb-6">
                <div>
                    <span>Switch state is{" "}</span>
                    <ZustandGetClient/>
                </div>
                <div>
                    <span>Go back to </span>
                    <Button type="link" variant="link" buttonSize="none" href="/zustand-set">
                        Zustand Set Page
                    </Button>
                </div>
        </main>
    );
}
