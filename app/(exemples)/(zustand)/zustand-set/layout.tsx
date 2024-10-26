import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Zustand Set",
    description: "Zustand Set page.",
}

export default function ResetLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return <>{children}</>;
}
