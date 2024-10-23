"use client";

import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import { useState } from "react";
import { signUp } from "@/auth-cient";
import LoadingButton from "@comps/server/loading-button";

type RegisterClientProps = {
    className: string;
    children: React.ReactNode;
};

export default function RegisterClient(props: RegisterClientProps) {
    const { className, children } = props;

    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    const Register = async (formData: FormData) => {
        // Start loading
        setLoading(true);

        const { data, error } = await signUp.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            name: formData.get("firstname") + " " + formData.get("lastname"),
            image: formData.get("image") ? convertImageToBase64(formData.get("profilePicture")) : undefined,
            callbackURL: "/dashboard",
        });

        if (data) {
            setMode("success");
            setMessage("Register successful.");
        } else if (error) {
            setMode("danger");
            setMessage("Register failed.");
        }

        // Stop loading
        setLoading(false);
    };

    return (
        <form action={Register} className={className}>
            {children}
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <LoadingButton type="submit" label="Register" loading={loading} />
        </form>
    );
}
