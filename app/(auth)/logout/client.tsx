"use client";

import { signOut } from "@lib/client";
import { useRouter } from "next/navigation";

export default function LogoutClient() {
    const router = useRouter();

    const logout = async () => {
        await signOut();
        router.push("/");
    };

    // Logout
    logout();

    return <></>;
}
