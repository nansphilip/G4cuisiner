import { createAuthClient } from "better-auth/react";

export const { signIn, signUp, useSession } = createAuthClient({
    baseURL: "http://localhost:3000", // Todo : set a .env variable
});
