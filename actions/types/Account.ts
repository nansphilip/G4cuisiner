"use server";

export interface AccountFixtures {
    id: string,
    accountId: string,
    providerId: string,
    userId: string,
    password: string | null
}