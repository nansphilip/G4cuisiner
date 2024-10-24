import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Profile password",
    description: "Profile password page.",
}

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return <>{children}</>
}
