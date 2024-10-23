import LoginClient from "@app/(auth)/login/client";
import Button from "@comps/client/button";

export default async function LoginPage() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow">
                <h2 className="text-2xl font-bold">Login</h2>
                <p className="text-center text-xs text-gray-500">Login with your email and password.</p>

                <LoginClient className="flex flex-col items-center justify-center gap-2">
                    <label className="flex w-full flex-col gap-1">
                        Email
                        <input
                            className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                            name="email"
                            type="email"
                            required
                            autoFocus
                        />
                    </label>
                    <label className="flex w-full flex-col gap-1">
                        Password
                        <input
                            className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                            name="password"
                            type="password"
                            required
                        />
                    </label>
                    <label className="flex w-full flex-row items-center justify-center gap-1 hover:cursor-pointer">
                        <input
                            name="rememberMe"
                            type="checkbox"
                            className="transition-all duration-150 checked:accent-gray-500 hover:cursor-pointer hover:accent-gray-700"
                        />
                        <span className="text-gray-500 transition-all duration-150 hover:text-gray-700">
                            Remember me
                        </span>
                    </label>
                </LoginClient>

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
