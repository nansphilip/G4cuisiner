import RegisterClient from "@app/(auth)/register/client";
import PasswordInputClient from "@comps/client/password";
import Button from "@comps/client/button";

export default async function RegisterPage() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
            <div className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow">
                <h2 className="text-2xl font-bold">Register</h2>
                <p className="text-center text-xs text-gray-500">Register with your personal informations.</p>

                <RegisterClient className="flex flex-col items-center justify-center gap-2">
                    <label className="flex w-full flex-col gap-1">
                        Firstname
                        <input
                            className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                            name="firstname"
                            type="text"
                            autoComplete="on"
                            autoFocus
                        />
                    </label>
                    <label className="flex w-full flex-col gap-1">
                        Lastname
                        <input
                            className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                            name="lastname"
                            type="text"
                            autoComplete="on"
                        />
                    </label>
                    <label className="flex w-full flex-col gap-1">
                        <div>
                            <span>Email </span>
                            <span className="text-red-500">*</span>
                        </div>
                        <input
                            className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                            name="email"
                            type="email"
                            required
                            autoComplete="on"
                        />
                    </label>
                    <label className="flex w-full flex-col gap-1">
                        <div>
                            <span>Password </span>
                            <span className="text-red-500">*</span>
                        </div>
                        <PasswordInputClient
                            className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                            name="newPassword"
                            required
                            autoComplete="on"
                        />
                    </label>
                    <label className="flex w-full flex-col gap-1">
                        <div>
                            <span>Profile picture</span>
                        </div>
                        <input
                            className="h-6 cursor-pointer rounded border text-xs ring-teal-400 ring-offset-2 transition-all duration-150 file:h-6 file:cursor-pointer file:border-none file:text-xs file:transition-all file:duration-150 hover:bg-gray-50 hover:file:bg-gray-200 focus:ring-2"
                            name="profilePicture"
                            type="file"
                            accept="image/*"
                        />
                    </label>
                </RegisterClient>

                <Button type="link" variant="link" ring="none" fontSize="sm" href="/login">
                    Already registered?
                </Button>
            </div>
        </main>
    );
}
