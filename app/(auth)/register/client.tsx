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
        const { data, error } = await signUp.email(
            {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                name: (formData.get("firstname") + " " + formData.get("lastname")) as string,
                image: undefined, // TODO: implement `convertImageToBase64(formData.get("profilePicture"))`
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

        // Display feedback
        if (data) {
            setMode("success");
            setMessage("Register successful.");
        } else if (error) {
            setMode("danger");
            setMessage("Register failed.");
        }
    };

    return (
        <form action={Register} className={className}>
            {children}
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <LoadingButton type="submit" label="Register" loading={loading} />
        </form>
    );
}
