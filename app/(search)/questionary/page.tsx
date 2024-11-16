import type { Metadata } from "next";
import QuestionaryClient from "./client";

export const metadata: Metadata = {
    title: "Let's find a recipe!",
    description: "Find a recipe by responding a few questions.",
};

export default async function QuestionaryPage() {
    return <QuestionaryClient />;
}
