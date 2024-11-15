"use client";

import { combo } from "@lib/combo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type MainCenterOrStartClientProps = {
    children: React.ReactNode;
};

/**
 * Check if main is scrollable, if true, justify content to start, else center content
 */
export default function MainClient(props: MainCenterOrStartClientProps) {
    const { children } = props;
    
    const pathname = usePathname();

    const [isMainScrollable, setIsMainScrollable] = useState(true);

    const CheckMainScrollState = () => {
        const headerEl = document.querySelector("header") as HTMLElement;
        const mainEl = document.querySelector("main") as HTMLElement;

        const documentHeight = document.documentElement.offsetHeight;
        const headerHeight = headerEl.scrollHeight;
        const mainScrollHeight = mainEl.scrollHeight;

        // If main is scrollable, justify content to start, else center
        setIsMainScrollable(mainScrollHeight > documentHeight - headerHeight);
    };

    useEffect(() => {
        CheckMainScrollState();
    }, [pathname]);

    useEffect(() => {
        window.addEventListener("load", CheckMainScrollState);
        window.addEventListener("resize", CheckMainScrollState);
        window.addEventListener("scroll", CheckMainScrollState); // Todo : find a better solution ?
        window.addEventListener("mousemove", CheckMainScrollState); // Todo : find a better solution ?
        window.addEventListener("touchstart", CheckMainScrollState); // Todo : find a better solution ?
        
        return () => {
            document.addEventListener("load", CheckMainScrollState);
            window.removeEventListener("resize", CheckMainScrollState);
            window.removeEventListener("scroll", CheckMainScrollState);
            window.removeEventListener("mousemove", CheckMainScrollState);
            window.removeEventListener("touchstart", CheckMainScrollState);
        };
    }, []);

    return (
        <main
            className={combo(
                "flex w-full overflow-x-hidden flex-1 flex-col items-center gap-2 overflow-y-auto px-4 py-4 max-w-[1440px]",
                isMainScrollable ? "justify-start" : "justify-center"
            )}
        >
            {children}
        </main>
    );
}
