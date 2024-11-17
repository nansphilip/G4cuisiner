import "@/globals.css";
import { SelectEveryRecipeSlugs } from "@actions/database/Recipe";
import HeaderClient from "@comps/client/header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "G4cuisiner",
    description:
        "Rejoignez notre communauté culinaire pour découvrir, partager et noter des recettes de cuisine. Ajoutez vos recettes préférées en favoris, laissez des commentaires et explorez une variété de plats créatifs pour inspirer vos repas.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const slugList = await SelectEveryRecipeSlugs();

    return (
        <html lang="fr" className="h-full overflow-hidden">
            <body className={`${inter.className} flex h-full flex-col items-center justify-center overflow-hidden`}>
                <HeaderClient slugList={slugList} className="w-full overflow-hidden" />
                <main className="flex size-full flex-col items-center justify-center overflow-hidden">
                    <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-start overflow-y-auto overflow-x-hidden p-4">
                        {children}
                    </div>
                </main>
            </body>
        </html>
    );
}
