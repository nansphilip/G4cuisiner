import LoginClient from "@app/(auth)/login/client";
import ButtonClient from "@comps/client/button";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login",
    description: "Login page.",
};

export default async function LoginPage() {

    const session = await getSession();
    if (session) redirect("/dashboard");

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow">
                <h2 className="text-2xl font-bold">Connexion</h2>
                <p className="text-center text-xs text-gray-500">Se connecter avec adresse mail et mot de passe.</p>
                <LoginClient className="flex w-[240px] flex-col items-center justify-center gap-2" />
                <div className="flex flex-col items-center justify-center">
                    <ButtonClient type="link" variant="link" ring="none" fontSize="sm" href="/register">
                        Pas encore inscrit ?
                    </ButtonClient>
                    <p className="text-xs text-gray-300">or</p>
                    <ButtonClient type="link" variant="link" ring="none" fontSize="sm" href="/reset">
                        Mot de passe oublié ?
                    </ButtonClient>
                </div>
            </div>
        </>
    );
}
