"use client";

import { useState } from "react";
import Button from "./button";
import { useRouter } from "next/navigation";
import { CreateReview } from "@actions/database/Review";

type AddReviewClientProps = {
    userId: string | undefined;
    recipeId: string;
};

export default function AddReviewClient(props: AddReviewClientProps) {
    const { userId, recipeId } = props;

    const router = useRouter();

    const [review, setReview] = useState("");

    const handleSubmit = async () => {
        // Check if user is logged in
        if (!userId) {
            return router.push("/login");
        }

        // Create review
        await CreateReview({ userId, recipeId, review });

        // Reset form
        setReview("");
    };

    return (
        <form
            action={handleSubmit}
            className="flex flex-col items-start justify-start gap-2"
        >
            <label htmlFor="review">Écrire un commentaire</label>
            <input
                className="w-full rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                id="review"
                name="review"
                type="text"
                placeholder="J'ai adoré cette recette..."
                onChange={(e) => setReview(e.target.value)}
                value={review}
                required
            />
            <div className="w-full text-center">
                <Button type="submit">Envoyer</Button>
            </div>
        </form>
    );
}
