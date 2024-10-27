"use client";

import { signOut } from "@lib/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutClient({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const logout = async () => {
        await signOut();
    };

    useEffect(() => {
        logout();
        router.push("/");
    }, [router]);

    return <>{children}</>;
}
