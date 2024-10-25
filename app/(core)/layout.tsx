import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";

export default async function VerifyLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const session = await getSession();
    if (!session) redirect("/login");

    return <>{children}</>
}
