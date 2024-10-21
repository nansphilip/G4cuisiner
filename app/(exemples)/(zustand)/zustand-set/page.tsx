import Button from "@comps/client/button";
import ZustandSetClient from "./client";

export default function ZustandSetPage() {

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 overflow-y-auto px-6 pb-6">
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
