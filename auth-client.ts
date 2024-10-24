import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;

/**
 * Type for the session data
 */
export type BetterSession = ReturnType<typeof useSession>;

/**
 * Type for the session data
 */
export type BetterSessionData = ReturnType<typeof useSession>["data"];
