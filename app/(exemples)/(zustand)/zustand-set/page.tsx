import Button from "@comps/client/button";
import ZustandSetClient from "./client";

export default function ZustandSetPage() {

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
            <div className="flex items-center gap-4">
                <ZustandSetClient/>
            </div>
            <div>
                <span>Go to </span>
                <Button type="link" variant="link" buttonSize="none" href="/zustand-get">
                    Zustand Get Page
                </Button>
                <span> to see result</span>
            </div>
        </main>
    );
}
