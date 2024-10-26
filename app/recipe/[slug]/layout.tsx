import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Recipe",
    description: "Recipe page.",
}

export default function ProfileLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return <>{children}</>
}
