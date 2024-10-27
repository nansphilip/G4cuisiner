import Prisma from "@lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";

// const rateLimit = {
//     window: 10,
//     max: 5,
// }

export const auth = betterAuth({
    database: prismaAdapter(Prisma, {
        provider: "mysql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    session: {
        expiresIn: 60 * 30, // Session expires in 30 minutes
        updateAge: 60 * 5 // Refresh the session every 5 minutes
    }
    // emailVerification: {
    // sendOnSignUp: true,
    // sendVerificationEmail: async (user, url, token) => {
    //     await sendEmail({
    //         to: user.email,
    //         subject: "Verify your email address",
    //         text: `Click the link to verify your email: ${url}`,
    //     });
    // },
    // sendResetPassword: async (user, url, token) => {
    //     await sendEmail({
    //         to: user.email,
    //         subject: "Reset your password",
    //         text: `Click the link to reset your password: ${url}`,
    //     });
    // },
    // },
    // plugins: [
    // Magic links
    // Passkeys
    // Two factor authentication
    // ],
    // socialProviders: {
    // apple: {
    //     clientId: process.env.APPLE_CLIENT_ID as string,
    //     clientSecret: process.env.APPLE_CLIENT_SECRET as string,
    // },
    // discord: {
    //     clientId: process.env.DISCORD_CLIENT_ID as string,
    //     clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    // },
    // github: {
    //     clientId: process.env.GITHUB_CLIENT_ID as string,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    // },
    // google: {
    //     clientId: process.env.GOOGLE_CLIENT_ID as string,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // },
    // microsoft: {
    //     clientId: process.env.MICROSOFT_CLIENT_ID as string,
    //     clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
    // },
    // },
    // user: {
    // changeEmail: {
    // enabled: true,
    // sendChangeEmailVerification: async (user, newEmail, url, token) => {
    //     await sendEmail({
    //         to: newEmail,
    //         subject: 'Verify your email change',
    //         text: `Click the link to verify: ${url}`
    //     })
    // }
    // }
    // },
    // account: {
    // accountLinking: {
    //     enabled: true,
    //     trustedProviders: ["google", "github"],
    // }
    // },
    // rateLimit: {
    // window: 10,
    // max: 20,
    // customRules: { // TODO : add /app/(auth)/... to the path ?
    //     "/register": rateLimit,
    //     "/login": rateLimit,
    //     "/reset": rateLimit,
    //     "/verify": rateLimit,
    // },
    // },
});

const { api } = auth;

const { getSession: getSessionThroughApi } = api;

/**
 * Get the session from server side
 */
export const getSession = async () => {
    const session = await getSessionThroughApi({
        headers: await headers(),
    });
    return session;
};

/**
 * Type for the session data
 */
export type BetterSessionServer = Awaited<ReturnType<typeof getSession>>;
