"use client";

import { useState } from "react";
import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import { signIn } from "@lib/client";
import LoadingButton from "@comps/server/loading-button";
import { useRouter } from "next/navigation";

type LoginClientProps = {
    className?: string;
};

export default function LoginClient(props: LoginClientProps) {
    const { className } = props;
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    // Inputs states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const Login = async () => {
        // Start loading
        setLoading(true);

        const { data, error } = await signIn.email({
            email: email,
            password: password,
            dontRememberMe: !rememberMe,
        });

        // Display feedback
        if (data) {
            setMode("success");
            setMessage("Login successful, redirecting...");
            setTimeout(() => {
                router.push("/dashboard");
            }, 500);
        } else if (error) {
            setMode("danger");
            setMessage("Login failed, email or password may be incorrect.");
            setLoading(false);
        }
    };

    return (
        <div className={className}>
            <label className="flex w-full flex-col gap-1">
                Email
                <input
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                />
            </label>
            <label className="flex w-full flex-col gap-1">
                Mot de passe
                <input
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <label className="flex w-full flex-row items-center justify-center gap-1 hover:cursor-pointer">
                <input
                    className="transition-all duration-150 checked:accent-gray-500 hover:cursor-pointer hover:accent-gray-700"
                    name="rememberMe"
                    type="checkbox"
                    value={rememberMe ? "on" : "off"}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="text-gray-500 transition-all duration-150 hover:text-gray-700">Se souvenir de moi</span>
            </label>
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <LoadingButton type="button" onClick={Login} label="Se connecter" loading={loading} />
        </div>
    );
}
