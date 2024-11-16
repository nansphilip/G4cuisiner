"use server";

import {
    CreateReviewType,
    SelectReviewType,
    GetReviewThumbType,
    ReturnReviewType,
    ReturnReviewThumbTypeType,
    UpdateReviewType,
    SelectReviewByIdType,
} from "@actions/types/Review";
import Prisma from "@lib/prisma";

export const CreateReview = async (props: CreateReviewType): Promise<ReturnReviewType> => {
    try {
        const { userId, recipeId, review } = props;
        const existingReview = await SelectReview({ userId, recipeId, review });
        if (existingReview) {
            throw new Error("Review already exists");
        }
        const updatedReview = await Prisma.review.create({
            data: {
                review,
                userId,
                recipeId,
            },
        });
        return updatedReview;
    } catch (error) {
        throw new Error("CreateReview -> " + (error as Error).message);
    }
};

export const SelectReview = async (props: SelectReviewType): Promise<ReturnReviewType | null> => {
    try {
        const { userId, recipeId, review } = props;
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
    } catch (error) {
        throw new Error("SelectReview -> " + (error as Error).message);
    }
};

export const SelectReviewThumb = async (props: GetReviewThumbType): Promise<ReturnReviewThumbTypeType[]> => {
    try {
        const { userId, reviewIdList } = props;
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
    } catch (error) {
        throw new Error("SelectReviewThumb -> " + (error as Error).message);
    }
};

export const SelectReviewById = async (props: SelectReviewByIdType): Promise<ReturnReviewType | null> => {
    try {
        const { reviewId } = props;
        const reviewData = await Prisma.review.findFirst({
            where: {
                id: reviewId,
            },
        });
        if (!reviewData) {
            return null;
        }
        return reviewData;
    } catch (error) {
        throw new Error("SelectReviewById -> " + (error as Error).message);
    }
};

export const UpdateReview = async (props: UpdateReviewType): Promise<ReturnReviewType | null> => {
    try {
        const { reviewId, userId, thumbsPositive, thumbsNegative } = props;
        const review = await SelectReviewById({ reviewId });
        if (!review) {
            return null;
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
    } catch (error) {
        throw new Error("UpdateReview -> " + (error as Error).message);
    }
};
