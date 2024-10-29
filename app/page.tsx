import { getSession } from "@lib/auth";
import HomeClient from "./client";

export default async function HomePage() {
    const session = await getSession();

    return (
        <>
            <h1 className="text-4xl font-bold">G4cuisiner</h1>
            <div className="flex gap-2">
                <HomeClient serverSession={session} />
            </div>
        </>
    );
}
