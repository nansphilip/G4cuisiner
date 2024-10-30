import CreateRecipe from "./client";
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Create recipe",
    description: "Create recipe page.",
}

export default async function CreateRecipePage() {

    return (
        <>
            <CreateRecipe className="flex flex-col items-center justify-center gap-2 rounded-xl border p-4 shadow">
            <label className="flex w-full flex-col gap-1">
                Title
                <input
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="title"
                    type="text"
                    required
                    autoFocus
                />
            </label>
            <label className="flex w-full flex-col gap-1">
                Description
                <textarea
                    className="rounded border px-2 outline-none ring-teal-400 ring-offset-2 transition-all duration-150 focus:ring-2"
                    name="description"
                    required
                />
            </label>
            <label className="flex w-full flex-col gap-1">
                <div>
                    <span>Image</span>
                </div>
                <input
                    className="h-6 cursor-pointer rounded border text-xs ring-teal-400 ring-offset-2 transition-all duration-150 file:pointer-events-none file:h-6 file:cursor-pointer file:border-none file:text-xs file:transition-all file:duration-150 hover:bg-gray-50 hover:file:bg-gray-200 focus:ring-2"
                    name="image"
                    type="file"
                    accept="image/*"
                />
            </label>
            
            </CreateRecipe>
        </>
    );
}
