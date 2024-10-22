import Button from "@comps/client/button";

export default async function HomePage() {
    // const session = await GetSession();
    const session = false;

    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2">
            <h1 className="text-4xl font-bold">G4cuisiner</h1>
            <div className="flex gap-2">
                {session ? (
                    <>
                        <Button type="link" href="/logout" variant="outline">
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button type="link" href="/register" variant="outline">
                            Register
                        </Button>
                        <Button type="link" href="/login">
                            Login
                        </Button>
                    </>
                )}
            </div>
        </main>
    );
}