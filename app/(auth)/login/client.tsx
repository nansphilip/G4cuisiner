"use client";

import { useState } from "react";
import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import { signIn } from "@/auth-cient";
import LoadingButton from "@comps/server/loading-button";

type LoginClientProps = {
    className?: string;
    children: React.ReactNode;
};

export default function LoginClient(props: LoginClientProps) {
    const { className, children } = props;

    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    const Login = async (formData: FormData) => {
        const { data, error } = await signIn.email(
            {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                dontRememberMe: !formData.get("rememberMe"),
                callbackURL: "/dashboard",
            },
            {
                onRequest: (ctx) => {
                    setLoading(true);
                    console.log("Register start :", ctx);
                },
                onSuccess: (ctx) => {
                    setLoading(false);
                    console.log("Register end :", ctx);
                },
                onError: (ctx) => {
                    setLoading(false);
                    console.log("Register failed :", ctx);
                },
            }
        );

        if (data) {
            setMode("success");
            setMessage("Login successful.");
        } else if (error) {
            setMode("danger");
            setMessage("Login failed.");
        }
    };

    return (
        <form action={Login} className={className}>
            {children}
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <LoadingButton type="submit" label="Login" loading={loading} />
        </form>
    );
}
