"use client";

import { useSession } from "@/auth-client";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
    const router = useRouter();
    const { data: session } = useSession();

    if (!session) {
        router.push("/login");
    }

    return <></>;
}
