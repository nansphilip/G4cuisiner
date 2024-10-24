import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000", // Todo : set a .env variable
});

export const { signIn, signUp, useSession } = authClient;

/**
 * Type for the session data
 */
export type BetterSession = ReturnType<typeof useSession>;

/**
 * Type for the session data
 */
export type BetterSessionData = ReturnType<typeof useSession>["data"];
