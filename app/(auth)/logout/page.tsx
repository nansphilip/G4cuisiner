import LogoutClient from "@app/(auth)/logout/client";
import Loader from "@comps/server/loader";

export default async function LogoutPage() {
    return (
        <main className="flex flex-1 flex-col items-center justify-center gap-2 px-4 pb-4">
            <LogoutClient>
                <Loader />
            </LogoutClient>
        </main>
    );
}
