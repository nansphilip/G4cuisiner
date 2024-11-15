import RegisterClient from "@app/(auth)/register/client";
import ButtonClient from "@comps/client/button";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Register",
    description: "Register page.",
}

export default async function RegisterPage() {

    const session = await getSession();
    if (session) redirect("/dashboard");

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow">
                <h2 className="text-2xl font-bold">Inscription</h2>
                <p className="text-center text-xs text-gray-500">S&apos;inscrire avec ses informations personnelles.</p>
                <RegisterClient className="flex w-[240px] flex-col items-center justify-center gap-2" />
                <ButtonClient type="link" variant="link" ring="none" fontSize="sm" href="/login">
                    Déjà inscrit ?
                </ButtonClient>
            </div>
        </>
    );
}
