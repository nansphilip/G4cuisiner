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
    const [disabled, setDisabled] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    const login = async (formData: FormData) => {
        // Start loading
        setLoading(true);
        setDisabled(true);

        const { data, error } = await signIn.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string
        });

        if (data) {
            setMode("success");
            setMessage("Login successful.");
        } else if (error) {
            setMode("danger");
            setMessage("Login failed.");
        }

        // Stop loading
        setLoading(false);
        setDisabled(false);
    };

    return (
        <form action={login} className={className}>
            {children}
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <LoadingButton label="Login" loading={loading} disabled={disabled} />
        </form>
    );
}
