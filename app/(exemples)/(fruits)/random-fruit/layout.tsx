import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Random fruit",
    description: "Random fruit page.",
}

export default function ResetLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return <>{children}</>;
}
