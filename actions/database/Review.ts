"use server";

import { InputReviewType, ReviewType } from "@actions/types/Review";
import Prisma from "@lib/prisma";

export const CreateReview = async (props: InputReviewType): Promise<ReviewType> => {
    try {
        const { userId, recipeId, review } = props;

        // Check if review already exists
        const existingReview = await GetReview({ userId, recipeId, review });

        // If review already exists, update it
        if (existingReview) {
            throw new Error("Review already exists");
        }

        // Create review
        const updatedReview = await Prisma.review.create({
            data: {
                review,
                userId,
                recipeId,
            },
        });

        return updatedReview;
    } catch (error) {
        throw new Error("Unable to update recipe -> " + (error as Error).message);
    }
};

export const GetReview = async (props: InputReviewType): Promise<ReviewType | null> => {
    const { userId, recipeId, review } = props;

    // Get review
    const reviewData = await Prisma.review.findFirst({
        where: {
            userId,
            recipeId,
            review,
        },
    });

    if (!reviewData) {
        return null;
    }

    return reviewData;
};

export const DeleteReview = async (props: InputReviewType): Promise<boolean> => {
    try {
        const { userId, recipeId, review } = props;

        // Check if review already exists
        const existingReview = await GetReview({ userId, recipeId, review });

        // If review does not exist, return false
        if (!existingReview) {
            return false;
        }

        // Delete review
        await Prisma.review.delete({
            where: {
                id: existingReview.id,
            },
        });

        return true;
    } catch (error) {
        throw new Error("Unable to delete recipe -> " + (error as Error).message);
    }
};
