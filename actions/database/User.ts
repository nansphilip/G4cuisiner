"use server";

import Prisma from "@lib/prisma";
import { IdUserType, UpdateUserRestrictionType, UserType } from "@actions/types/User";

// Fonction pour restreindre un utilisateur
export const UpdateUserRestriction = async ({ userId, restricted }: UpdateUserRestrictionType): Promise<boolean> => {
    try {
        await Prisma.user.update({
            data: {
                restricted,
            },
            where: {
                id: userId,
            },
        });
        return true;
    } catch (error) {
        throw new Error("Unable to update user restriction -> " + (error as Error).message);
    }
};

export const SelectEveryUser = async (): Promise<UserType[]> => {
    const user = await Prisma.user.findMany({});
    return user;
};

// Fonction pour obtenir l'état de restriction d'un utilisateur
export const SelectUserRestriction = async ({ userId }: IdUserType): Promise<boolean> => {
    try {
        const user = await Prisma.user.findUnique({
            where: { id: userId },
            select: { restricted: true },
        });

        if (!user) {
            throw new Error("Unable to find user");
        }

        return user.restricted;
    } catch (error) {
        throw new Error("SelectUserRestriction status -> " + (error as Error).message);
    }
};

export const SelectUserRole = async ({ userId }: IdUserType) => {
    try {
        const user = await Prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });

        if (!user) {
            throw new Error("Unable to find user");
        }

        return user.role === "ADMIN";
    } catch (error) {
        throw new Error("SelectUserRestriction status -> " + (error as Error).message);
    }
};

export const UpdateUserRole = async ({
    userId,
    role,
}: {
    userId: string;
    role: "USER" | "MODO" | "ADMIN";
}): Promise<boolean> => {
    try {
        await Prisma.user.update({
            where: { id: userId },
            data: { role },
        });
        return true;
    } catch (error) {
        throw new Error("Unable to update user role -> " + (error as Error).message);
    }
};
