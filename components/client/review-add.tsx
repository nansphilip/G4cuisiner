"use client";

import { CreateReview } from "@actions/database/Review";
import { useSession } from "@lib/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReviewListProps } from "./review-display";
import { useStore } from "@lib/zustand";
import ButtonClient from "./button";

type ReviewAddClientProps = {
    userRating: number | null;
    recipeId: string;
}

export default function ReviewAddClient(props: ReviewAddClientProps) {

    const { userRating, recipeId } = props;

    const {data:session}= useSession();

    const {reviewListStore, setReviewListStore} = useStore();

    // Add review
    const [newReview, setNewReview] = useState("");

    const router = useRouter();

    const handleSubmit = async () => {
        // Check if user is logged in
        if (!session?.user.id || !session?.user.name) {
            return router.push("/login");
        }

        // Create review
        const reviewData = await CreateReview({ userId: session.user.id, recipeId, review: newReview });

        const addReviewList: ReviewListProps = [
            {
                currentUserId: session.user.id,
                reviewId: reviewData.id,
                name: session.user.name,
                rating: userRating ?? null,
                review: reviewData.review,
                positive: { count: 0, state: false },
                negative: { count: 0, state: false },
                createdAt: reviewData.createdAt,
            },
            ...reviewListStore[0],
        ];

        setReviewListStore([addReviewList, new Date()]);

        // Reset form
        setNewReview("");
    };

    return (
        <form action={handleSubmit} className="flex flex-col items-start justify-start gap-2">
            <label htmlFor="review">Écrire un commentaire</label>
            <input
                className="w-full rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                id="review"
                name="review"
                type="text"
                placeholder="J'ai adoré cette recette..."
                onChange={(e) => setNewReview(e.target.value)}
                value={newReview}
                required
            />
            <div className="w-full text-center">
                <ButtonClient type="submit">Envoyer</ButtonClient>
            </div>
        </form>
    );
}
