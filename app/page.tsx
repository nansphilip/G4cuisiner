import HomeClient from "./client";

export default async function HomePage() {

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">G4cuisiner</h1>
            <div className="flex gap-2">
                <HomeClient />
            </div>
        </main>
    );
}