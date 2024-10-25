import RegisterClient from "@app/(auth)/register/client";
import Button from "@comps/client/button";

export default async function RegisterPage() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow">
                <h2 className="text-2xl font-bold">Register</h2>
                <p className="text-center text-xs text-gray-500">Register with your personal informations.</p>
                <RegisterClient className="flex w-[240px] flex-col items-center justify-center gap-2" />
                <Button type="link" variant="link" ring="none" fontSize="sm" href="/login">
                    Already registered?
                </Button>
            </div>
        </main>
    );
}
