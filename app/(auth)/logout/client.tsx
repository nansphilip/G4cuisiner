"use client";

import { signOut, useSession } from "@lib/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutClient({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const {data: session} = useSession();

    if (!session) {
        router.push("/");
    }

    const logout = async () => {
        await signOut();
    };

    useEffect(() => {
        logout();
    }, []);

    return <>{children}</>;
}
