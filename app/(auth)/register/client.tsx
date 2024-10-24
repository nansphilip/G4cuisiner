"use client";

import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import { useState } from "react";
import { signUp, useSession } from "@/auth-client";
import LoadingButton from "@comps/server/loading-button";
import PasswordInputClient from "@comps/client/password";
import { useRouter } from "next/navigation";

type RegisterClientProps = {
    className: string;
};

export default function RegisterClient(props: RegisterClientProps) {
    const router = useRouter();
    const {data: session} = useSession();

    if (session) {
        router.push("/dashboard");
    }
    
    const { className } = props;

    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    // Inputs states
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState<File | undefined>();

    console.log(profilePicture);

    const Register = async () => {
        const { data, error } = await signUp.email(
            {
                email: email,
                password: password,
                name: firstname + " " + lastname,
                image: undefined, // TODO: Add image conversion to base64
                callbackURL: "/",
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
        <div className={className}>
            <label className="flex w-full flex-col gap-1">
                Firstname
                <input
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="firstname"
                    type="text"
                    autoComplete="on"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
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
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label className="flex w-full flex-col gap-1">
                <div>
                    <span>Password </span>
                    <span className="text-red-500">*</span>
                </div>
                <PasswordInputClient
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="password"
                    required
                    autoComplete="on"
                    password={password}
                    setPassword={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setProfilePicture(e.target.files?.[0])}
                />
            </label>
            <FormFeedback mode={mode}>{message}</FormFeedback>
            <LoadingButton type="button" onClick={Register} label="Register" loading={loading} />
        </div>
    );
}
