import LogoutClient from "@app/(auth)/logout/client";
import Loader from "@comps/server/loader";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Logout",
    description: "Logout page.",
}

export default async function LogoutPage() {

    const session = await getSession();
    if (!session) redirect("/login");

    return (
        <>
            <LogoutClient>
                <Loader />
            </LogoutClient>
        </>
    );
}
