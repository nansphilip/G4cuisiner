"use client";

import { combo } from "@lib/combo";
import { useEffect, useState } from "react";

type MainCenterOrStartClientProps = {
    children: React.ReactNode;
};

/**
 * Check if main is scrollable, if true, justify content to start, else center content
 */
export default function MainCenterOrStartClient(props: MainCenterOrStartClientProps) {
    const { children } = props;
    
    const [isMainScrollable, setIsMainScrollable] = useState(false);

    const CheckMainScrollState = () => {
        const headerEl = document.querySelector("header") as HTMLElement;
        const mainEl = document.querySelector("main") as HTMLElement;

        const documentHeight = document.documentElement.scrollHeight;
        const headerHeight = headerEl.scrollHeight;
        const mainScrollHeight = mainEl.scrollHeight;

        // If main is scrollable, justify content to start, else center
        setIsMainScrollable(mainScrollHeight > documentHeight - headerHeight);
    };

    useEffect(() => {
        window.addEventListener("load", CheckMainScrollState);
        window.addEventListener("resize", CheckMainScrollState);
        window.addEventListener("mousemove", CheckMainScrollState); // Todo : find a better solution ?
        
        return () => {
            window.removeEventListener("load", CheckMainScrollState);
            window.removeEventListener("resize", CheckMainScrollState);
            window.removeEventListener("mousemove", CheckMainScrollState);
        };
    }, []);

    return (
        <main
            className={combo(
                "flex w-full flex-1 flex-col items-center gap-2 overflow-auto px-4 pb-4",
                isMainScrollable ? "justify-start" : "justify-center"
            )}
        >
            {children}
        </main>
    );
}
