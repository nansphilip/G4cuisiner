"use server";

export interface UserFixtures {
    id: string,
    name: string,
    email: string,
    emailVerified: boolean,
    image: string | null,
    role: "USER" | "MODO" | "ADMIN"
}