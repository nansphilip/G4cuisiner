"use client";

import { useSession } from "@/auth-client";
import Button from "@comps/client/button";

export default function HomeClient() {
    const { data: session } = useSession();

    if (session) {
        return (
            <Button type="link" href="/logout" variant="outline">
                Logout
            </Button>
        );
    }

    return (
        <>
            <Button type="link" href="/register" variant="outline">
                Register
            </Button>
            <Button type="link" href="/login">
                Login
            </Button>
        </>
    );
}
