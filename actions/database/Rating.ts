"use server";

import { CreateRatingType, SelectRatingType, UpdateRatingType, ReturnRatingType } from "@actions/types/Rating";
import Prisma from "@lib/prisma";

export const CreateRating = async (props: CreateRatingType): Promise<ReturnRatingType> => {
    try {
        const { userId, recipeId, rating } = props;
        const existingRating = await SelectRating({ userId, recipeId });
        if (existingRating) {
            return await UpdateRating(props);
        }
        const updatedRating = await Prisma.rating.create({
            data: {
                rating,
                userId,
                recipeId,
            },
        });
        return updatedRating;
    } catch (error) {
        throw new Error("CreateRating -> " + (error as Error).message);
    }
};

export const SelectRating = async (props: SelectRatingType): Promise<ReturnRatingType | null> => {
    try {
        const { userId, recipeId } = props;
        const rating = await Prisma.rating.findUnique({
            where: {
                userId_recipeId: {
                    userId,
                    recipeId,
                },
            },
        });
        if (!rating) {
            return null;
        }
        return rating;
    } catch (error) {
        throw new Error("SelectRating -> " + (error as Error).message);
    }
};

export const UpdateRating = async (props: UpdateRatingType): Promise<ReturnRatingType> => {
    try {
        const { userId, recipeId, rating } = props;
        const existingRating = await SelectRating({ userId, recipeId });
        if (!existingRating) {
            return await CreateRating(props);
        }
        const updatedRating = await Prisma.rating.update({
            data: {
                rating,
            },
            where: {
                userId_recipeId: {
                    userId,
                    recipeId,
                },
            },
        });
        return updatedRating;
    } catch (error) {
        throw new Error("UpdateRating -> " + (error as Error).message);
    }
};

export const DeleteRating = async (props: SelectRatingType): Promise<ReturnRatingType | null> => {
    try {
        const { userId, recipeId } = props;
        const existingRating = await SelectRating({ userId, recipeId });
        if (!existingRating) {
            return null;
        }
        await Prisma.rating.delete({
            where: {
                userId_recipeId: {
                    userId,
                    recipeId,
                },
            },
        });
        return existingRating;
    } catch (error) {
        throw new Error("DeleteRating -> " + (error as Error).message);
    }
};
