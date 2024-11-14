"use server";

import {
    IdInputReviewType,
    InputReviewType,
    InputThumbsType,
    ReviewType,
    UpdateReviewType,
} from "@actions/types/Review";
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

export const GetReviewThumb = async (props: InputThumbsType): Promise<{ positive: boolean; negative: boolean }[]> => {
    const { userId, reviewIdList } = props;

    // Récupérer toutes les reviews en une seule requête
    const reviewList = await Prisma.review.findMany({
        where: {
            id: { in: reviewIdList },
        },
        select: {
            thumbsPositive: {
                select: {
                    id: true,
                },
            },
            thumbsNegative: {
                select: {
                    id: true,
                },
            },
        },
    });

    if (reviewList.length !== reviewIdList.length) {
        throw new Error("Some reviews do not exist");
    }

    const thumbStates = reviewList.map((review) => ({
        positive: review.thumbsPositive.some((thumb) => thumb.id === userId),
        negative: review.thumbsNegative.some((thumb) => thumb.id === userId),
    }));

    return thumbStates;
};

export const GetReviewById = async (props: IdInputReviewType): Promise<ReviewType | null> => {
    const { reviewId } = props;

    // Get review
    const reviewData = await Prisma.review.findFirst({
        where: {
            id: reviewId,
        },
    });

    if (!reviewData) {
        return null;
    }

    return reviewData;
};

export const UpdateReview = async (props: UpdateReviewType): Promise<ReviewType> => {
    const { reviewId, userId, thumbsPositive, thumbsNegative } = props;

    const review = await GetReviewById({ reviewId });

    if (!review) {
        throw new Error("Review does not exist");
    }

    const updatedReview = await Prisma.review.update({
        where: {
            id: reviewId,
        },
        data: {
            thumbsPositive: {
                [thumbsPositive ? "connect" : "disconnect"]: { id: userId },
            },
            thumbsNegative: {
                [thumbsNegative ? "connect" : "disconnect"]: { id: userId },
            },
        },
    });

    return updatedReview;
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
