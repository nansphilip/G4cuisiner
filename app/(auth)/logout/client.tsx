"use client";

import { signOut, useSession } from "@/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutClient({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const {data: session} = useSession();

    if (!session) {
        router.push("/login");
    }

    const logout = async () => {
        await signOut();
    };

    useEffect(() => {
        logout();
    }, []);

    return <>{children}</>;
}
