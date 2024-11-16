"use server";

import Prisma from "@lib/prisma";
import { ReturnUserType, SelectUser, UpdateUserType } from "@actions/types/User";

export const SelectUserById = async (props: SelectUser): Promise<ReturnUserType | null> => {
    try {
        const { userId } = props;
        const user = await Prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return null;
        }
        return user;
    } catch (error) {
        throw new Error("SelectUserById -> " + (error as Error).message);
    }
}

export const SelectEveryUser = async (): Promise<ReturnUserType[] | null> => {
    try {
        const userList = await Prisma.user.findMany();
        if (userList.length === 0) {
            return null;
        }
        return userList;
    } catch (error) {
        throw new Error("SelectEveryUser -> " + (error as Error).message);
    }
};

export const UpdateUser = async (props: UpdateUserType): Promise<ReturnUserType |null> => {
    try {
        const { userId, data } = props;
        const existingUser = SelectUserById({ userId });
        if (!existingUser) {
            return null;
        }
        const updatedUser = await Prisma.user.update({
            where: { id: userId },
            data,
        });
        return updatedUser
    } catch (error) {
        throw new Error("UpdateUserRole -> " + (error as Error).message);
    }
};
