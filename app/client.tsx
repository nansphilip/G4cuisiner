"use client";

import { BetterSessionServer } from "@lib/auth";
import { useSession } from "@lib/client";
import Button from "@comps/client/button";

type HomeClientProps = {
    serverSession: BetterSessionServer;
};

export default function HomeClient(props: HomeClientProps) {
    const { serverSession } = props;
    const { data: sessionClient, isPending } = useSession();
    const session = isPending ? serverSession : sessionClient;

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
