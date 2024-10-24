import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Logout",
    description: "Logout page.",
}

export default function LogoutLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return <>{children}</>
}
