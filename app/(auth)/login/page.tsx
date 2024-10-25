import LoginClient from "@app/(auth)/login/client";
import Button from "@comps/client/button";

export default async function LoginPage() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow">
                <h2 className="text-2xl font-bold">Login</h2>
                <p className="text-center text-xs text-gray-500">Login with your email and password.</p>
                <LoginClient className="flex w-[240px] flex-col items-center justify-center gap-2" />
                <div className="flex flex-col items-center justify-center">
                    <Button type="link" variant="link" ring="none" fontSize="sm" href="/register">
                        Not registered yet?
                    </Button>
                    <p className="text-xs text-gray-300">or</p>
                    <Button type="link" variant="link" ring="none" fontSize="sm" href="/reset">
                        Forgot password?
                    </Button>
                </div>
            </div>
        </main>
    );
}
