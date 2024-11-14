"use client";

import FormFeedback, { FormFeedbackProps } from "@comps/server/form-feedback";
import { useState } from "react";
import { signUp } from "@lib/client";
import LoadingButton from "@comps/server/loading-button";
import PasswordClient from "@comps/client/password";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { combo } from "@lib/combo";

type RegisterClientProps = {
    className: string;
};

export default function RegisterClient(props: RegisterClientProps) {
    const { className } = props;
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<FormFeedbackProps["mode"]>("hidden");
    const [message, setMessage] = useState("");

    // Inputs states
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    // eslint-disable-next-line
    // const [profilePicture, setProfilePicture] = useState<File | undefined>();

    const avatarList = [
        "/avatars/avatar1.webp",
        "/avatars/avatar2.webp",
        "/avatars/avatar3.webp",
        "/avatars/avatar4.webp",
        "/avatars/avatar5.webp",
        "/avatars/avatar6.webp",
    ];

    const Register = async () => {
        // Start loading
        setLoading(true);

        const { data, error } = await signUp.email({
            email: email,
            password: password,
            name: firstname + " " + lastname,
            image: imageUrl,
            // image: profilePicture, // TODO: Add image conversion to base64 -> imageToBase64(profilePicture)
        });

        // Display feedback
        if (data) {
            setMode("success");
            setMessage("Registration successful. Redirecting...");
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
        } else if (error) {
            setMode("danger");
            setMessage("Registration failed, something went wrong.");
            setLoading(false);
        }
    };

    return (
        <div className={className}>
            <div className="flex w-full flex-row gap-2">
                <label className="flex flex-col gap-1">
                    Prénom
                    <input
                        className="w-full rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                        name="firstname"
                        type="text"
                        autoComplete="on"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        autoFocus
                    />
                </label>
                <label className="flex flex-col gap-1">
                    Nom
                    <input
                        className="w-full rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                        name="lastname"
                        type="text"
                        autoComplete="on"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </label>
            </div>
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
                    <span>Mot de passe</span>
                    <span className="text-red-500">*</span>
                </div>
                <PasswordClient
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="password"
                    required
                    autoComplete="on"
                    password={password}
                    setPassword={(e) => setPassword(e.target.value)}
                />
            </label>
            <div className="flex flex-col">
                <span>Choisissez un avatar :</span>
                <div className="mt-2 grid grid-cols-3 gap-4">
                    {avatarList.map((avatarUrl, index) => (
                        <button onClick={() => setImageUrl(avatarUrl)} type="button" key={index}>
                            <Image
                                src={avatarUrl}
                                height={64}
                                width={64}
                                alt={`Avatar ${index + 1}`}
                                className={combo(
                                    "size-16 rounded-full border",
                                    imageUrl === avatarUrl && "ring-2 ring-teal-400"
                                )}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <FormFeedback mode={mode}>{message}</FormFeedback>
            <LoadingButton type="button" onClick={Register} label="S'inscrire" loading={loading} />
        </div>
    );
}
