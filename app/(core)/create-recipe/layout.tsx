import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create recipe",
    description: "Create recipe page.",
}

export default function CreateRecipeLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    return <>{children}</>
}
