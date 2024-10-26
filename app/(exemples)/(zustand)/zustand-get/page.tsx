"use client";

import Button from "@comps/client/button";
import ZustandGetClient from "./client";

export default function ZustandGetPage() {

    return (
        <>
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
        </>
    );
}
