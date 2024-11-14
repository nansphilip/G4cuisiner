import "@/globals.css";
import { SelectEveryRecipeSlugs } from "@actions/database/Recipe";
import { SelectUserRole } from "@actions/database/User";
import HeaderClient from "@comps/client/header";
import MainClient from "@comps/client/main";
import { getSession } from "@lib/auth";
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
    const session = await getSession();
    const isUserAdmin = session && (await SelectUserRole({ userId: session.user.id }));

    const slugList = await SelectEveryRecipeSlugs()

    const slugPageList = [{ group: "Recettes", route: "/recipe", slugList }];

    return (
        <html lang="fr" className="h-full overflow-y-hidden">
            <body className={`${inter.className} flex h-full flex-col items-center justify-center overflow-y-hidden`}>
                <HeaderClient isUserAdmin={isUserAdmin} slugList={slugList} slugPageList={slugPageList} className="w-full" />
                <MainClient>{children}</MainClient>
            </body>
        </html>
    );
}
