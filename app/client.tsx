"use client";

import { useSession } from "@lib/client";
import Button from "@comps/client/button";
import Loader from "@comps/server/loader";


export default function HomeClient() {
    const { data: session, isPending, isRefetching } = useSession();

    if (isPending || isRefetching) {
        return <Loader />;
    }

    return session ? (
        <>
            <Button type="link" href="/logout" variant="outline">
                Logout
            </Button>
        </>
    ) : (
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
