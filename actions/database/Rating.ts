"use server";

import { InputRatingType, RatingType, CreateUpdateRatingType } from "@actions/types/Rating";
import Prisma from "@lib/prisma";

export const CreateRating = async (props: CreateUpdateRatingType): Promise<RatingType> => {
    try {
        const { userId, recipeId, rating } = props;

        // Check if rating already exists
        const existingRating = await SelectRating({ userId, recipeId });

        // If rating already exists, update it
        if (existingRating) {
            return UpdateRating(props);
        }

        // Create rating
        const updatedRating = await Prisma.rating.create({
            data: {
                rating,
                userId,
                recipeId,
            },
        });

        return updatedRating;
    } catch (error) {
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};

export const SelectRating = async (props: InputRatingType): Promise<RatingType | null> => {
    const { userId, recipeId } = props;

    // Get rating
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
};

export const UpdateRating = async (props: CreateUpdateRatingType): Promise<RatingType> => {
    try {
        const { userId, recipeId, rating } = props;

        // Check if rating already exists
        const existingRating = await SelectRating({ userId, recipeId });

        // If rating does not exist, create it
        if (!existingRating) {
            return CreateRating(props);
        }

        // Update rating
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
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};

export const DeleteRating = async (props: InputRatingType): Promise<boolean> => {
    try {
        const { userId, recipeId } = props;

        // Check if rating already exists
        const existingRating = await SelectRating({ userId, recipeId });

        // If rating does not exist, return false
        if (!existingRating) {
            return false;
        }

        // Delete rating
        await Prisma.rating.delete({
            where: {
                userId_recipeId: {
                    userId,
                    recipeId,
                },
            },
        });

        return true;
    } catch (error) {
        throw new Error("Unable to delete recipe -> " + (error as Error).message);
    }
};
