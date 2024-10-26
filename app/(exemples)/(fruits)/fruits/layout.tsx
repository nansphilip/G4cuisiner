import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Fruits",
    description: "Fruits page.",
}

export default function ResetLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return <>{children}</>;
}
