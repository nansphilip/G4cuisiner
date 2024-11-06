"use server";

import Prisma from "@lib/prisma";
import { LunchStepType } from "@actions/types/LunchStep";

//Recupere tous les lunchstep par ordre croissant d'id
export const GetLunchSteps = async (): Promise<LunchStepType[]> => {
    try {
        const lunchStepList = await Prisma.lunchStep.findMany({
            orderBy: {
                id: "asc", // 'asc' pour ordre croissant, 'desc' pour ordre décroissant
            },
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(lunchStepList);
            }, 1000);
        });
    } catch (error) {
        throw new Error(
            "Unable to GetLunchSteps -> " + (error as Error).message
        );
    }
};
