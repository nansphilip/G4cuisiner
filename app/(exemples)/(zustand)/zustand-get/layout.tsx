import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Zustand Get",
    description: "Zustand Get page.",
}

export default function ResetLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return <>{children}</>;
}
