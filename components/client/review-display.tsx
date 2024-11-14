"use client";

import { UpdateReview } from "@actions/database/Review";
import RatingDisplayClient from "@comps/client/rating-display";
import { combo } from "@lib/combo";
import { useStore } from "@lib/zustand";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type ReviewDisplayClientProps = {
    userId: string | undefined;
    userName: string | undefined;
    userThumbs: { positive: boolean; negative: boolean }[] | null;
    reviewList: {
        reviewId: string;
        userId: string;
        name: string;
        rating: number | null;
        review: string;
        thumbsPositive: number;
        thumbsNegative: number;
        createdAt: Date;
    }[];
    classDiv?: string;
    classCom?: string;
};

type Thumb = { state: boolean; count: number };

export type ReviewListProps = {
    currentUserId: string;
    reviewId: string;
    name: string;
    rating: number | null;
    review: string;
    positive: Thumb;
    negative: Thumb;
    createdAt: Date;
}[];

export type ReviewListStoreProps = [ReviewListProps, Date];

export default function ReviewDisplayClient(props: ReviewDisplayClientProps) {
    const { userId, userName, reviewList: reviewListRaw, userThumbs, classDiv, classCom } = props;

    const router = useRouter();

    // Preformat review list
    const preformattedReviewList: ReviewListProps = reviewListRaw.map(
        ({ userId: currentUserId, reviewId, name, rating, review, thumbsPositive, thumbsNegative, createdAt }, index) => ({
            currentUserId,
            reviewId,
            name,
            rating,
            review,
            createdAt,
            positive: {
                state: userThumbs?.[index].positive ?? false,
                count: thumbsPositive,
            },
            negative: {
                state: userThumbs?.[index].negative ?? false,
                count: thumbsNegative,
            },
        })
    );

    // Sort review list, and update if override is provided
    const sortReviewList = (
        preformattedReviewList: ReviewListProps,
        sort: boolean,
        override?: {
            reviewId: string;
            newPositive: Thumb;
            newNegative: Thumb;
        }
    ): ReviewListProps => {
        const formattedList = preformattedReviewList.map(
            ({ currentUserId, reviewId, name, rating, review, positive, negative, createdAt }) => ({
                currentUserId,
                reviewId,
                name,
                rating,
                review,
                createdAt,
                positive: {
                    state: override && reviewId === override.reviewId ? override.newPositive.state : positive.state,
                    count: override && reviewId === override.reviewId ? override.newPositive.count : positive.count,
                },
                negative: {
                    state: override && reviewId === override.reviewId ? override.newNegative.state : negative.state,
                    count: override && reviewId === override.reviewId ? override.newNegative.count : negative.count,
                },
            })
        );

        if (sort) {
            return formattedList
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .sort((a, b) => b.positive.count + b.negative.count - (a.positive.count + a.negative.count))
                .sort((a, b) => {
                    const bPosCount = b.positive.count === 0 ? 1 : b.positive.count;
                    const bNegCount = b.negative.count === 0 ? 1 : b.negative.count;
                    const aPosCount = a.positive.count === 0 ? 1 : a.positive.count;
                    const aNegCount = a.negative.count === 0 ? 1 : a.negative.count;
                    return bPosCount / bNegCount - aPosCount / aNegCount;
                });
        }

        return formattedList;
    };

    // Set sorted review list
    const initialReviewListSorted = sortReviewList(preformattedReviewList, true);
    const [reviewList, setReviewList] = useState<ReviewListStoreProps>([initialReviewListSorted, new Date()]);
    const { reviewListStore, setReviewListStore } = useStore();

    useEffect(() => {
        const isStoreMoreRecent = reviewListStore[1].getTime() > reviewList[1].getTime();
        // Update useState or useStore with the most recent value
        if (isStoreMoreRecent) {
            setReviewList(reviewListStore);
        } else if (!isStoreMoreRecent) {
            setReviewListStore(reviewList);
        }
    }, [reviewList, setReviewList, reviewListStore, setReviewListStore]);

    // Update thumb
    const updateThumb = async (reviewId: string, thumbType: "positive" | "negative") => {
        // Check if user is logged in
        if (!userId || !userName) {
            return router.push("/login");
        }

        // Select the corresponding review in the current list
        const review = reviewList[0].find((review) => review.reviewId === reviewId);
        if (!review) {
            return;
        }

        // Unset negative
        const thumbInverse = thumbType === "positive" ? "negative" : "positive";
        if (review[thumbInverse].state) {
            updateThumb(reviewId, thumbInverse);
        }

        // Set new thumb state and count
        const thumbBool = thumbType === "positive" ? true : false;

        const newPositive = {
            state: thumbBool ? !review.positive.state : false,
            count: thumbBool
                ? review.positive.state
                    ? review.positive.count - 1
                    : review.positive.count + 1
                : review.positive.state
                ? review.positive.count - 1
                : review.positive.count,
        };

        const newNegative = {
            state: !thumbBool ? !review.negative.state : false,
            count: !thumbBool
                ? review.negative.state
                    ? review.negative.count - 1
                    : review.negative.count + 1
                : review.negative.state
                ? review.negative.count - 1
                : review.negative.count,
        };

        // Set new review list
        const newReviewList = sortReviewList(reviewList[0], false, { reviewId, newPositive, newNegative });
        setReviewList([newReviewList, new Date()]);

        // Update database
        await UpdateReview({
            reviewId: review.reviewId,
            userId,
            thumbsPositive: thumbBool ? !review.positive.state : false,
            thumbsNegative: !thumbBool ? !review.negative.state : false,
        });
    };

    return (
        <div className={combo("space-y-2", classDiv)}>
            {reviewList[0].map(({ name, currentUserId, reviewId, review, rating: ratingUser, positive, negative, createdAt }, index) => {
                const formattedDate = new Date(createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                });
                const formattedTime = new Date(createdAt).toLocaleTimeString("fr-FR", {
                    hour: "numeric",
                    minute: "numeric",
                });
                return (
                    <div key={index} className={combo("border rounded-md py-2 px-4 text-black", classCom)}>
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-row gap-3">
                                <h3 className="font-bold">{name}</h3>
                                <RatingDisplayClient currentUserId={currentUserId} userId={userId} ratingUser={ratingUser} />
                                <div className="flex flex-row gap-2">
                                    <span>{formattedTime}</span>
                                    <span className="font-bold">•</span>
                                    <span>{formattedDate}</span>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2">
                                <button
                                    onClick={() => updateThumb(reviewId, "positive")}
                                    className={combo(
                                        "flex w-fit flex-row items-center justify-center gap-2 rounded-full border-2 px-3 py-0.5 border-gray-300 text-gray-500 hover:bg-gray-100 transition-all duration-150 hover:border-gray-500 hover:text-gray-500",
                                        positive.state &&
                                            "border-blue-600 text-blue-600 hover:border-blue-500 hover:text-blue-500"
                                    )}
                                >
                                    <div className="flex flex-row items-center justify-center gap-2">
                                        <ThumbsUp className="size-4" />
                                        <span>{positive.count}</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => updateThumb(reviewId, "negative")}
                                    className={combo(
                                        "flex w-fit flex-row items-center justify-center gap-2 rounded-full border-2 px-3 py-0.5 border-gray-300 text-gray-500 hover:bg-gray-100 transition-all duration-150 hover:border-gray-500 hover:text-gray-500",
                                        negative.state &&
                                            "border-gray-600 text-gray-600 hover:border-gray-500 hover:text-gray-500"
                                    )}
                                >
                                    <ThumbsDown className="size-4" />
                                    <span>{negative.count}</span>
                                </button>
                            </div>
                        </div>
                        <p>{review}</p>
                    </div>
                );
            })}
        </div>
    );
}
