"use client";

import Loader from "@comps/server/loader";
import Button from "@comps/client/button";
import { useState } from "react";
import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";

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

    const loginAsync = async () => {
        // Start loading
        setLoading(true);
        setDisabled(true);

        // const success = await login();
        const success = true;

        if (success) {
            setMode("success");
            setMessage("Login successful.");
        } else {
            setMode("danger");
            setMessage("Login failed.");
        }

        // Stop loading
        setLoading(false);
        setDisabled(false);
    };

    return (
        <form action={loginAsync} className={className}>
            {children}
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <Button type="submit" disabled={disabled} ring="none" className="flex items-center justify-center gap-2">
                <ButtonContent loading={loading} />
            </Button>
        </form>
    );
}

type ButtonProps = {
    loading: boolean;
};

const ButtonContent = (props: ButtonProps) => {
    const { loading } = props;
    if (loading) {
        return (
            <>
                <Loader />
                <span>Loading...</span>
            </>
        );
    }
    return <>Login</>;
};
