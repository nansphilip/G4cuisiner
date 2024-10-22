"use client";

import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import Button from "@comps/client/button";
import Loader from "@comps/server/loader";
import { useState } from "react";

type RegisterClientProps = {
    className: string;
    children: React.ReactNode;
};

export default function RegisterClient(props: RegisterClientProps) {
    const { className, children } = props;

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    const registerAsync = async () => {
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
        <form action={registerAsync} className={className}>
            {children}
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <Button type="submit" disabled={disabled} className="flex items-center justify-center gap-2">
                {<ButtonContent loading={loading} />}
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