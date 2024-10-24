import "@/globals.css";
import HeaderClient from "@comps/client/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "G4cuisiner",
    description: "Application de partage de recettes",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="fr" className="h-full">
            <body className={`${inter.className} flex h-full flex-col items-center justify-center overflow-x-hidden`}>
                <HeaderClient />
                {children}
            </body>
        </html>
    );
}
