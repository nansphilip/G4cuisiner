import LogoutClient from "@app/(auth)/logout/client"
import Loader from "@comps/server/loader"

export default async function LogoutPage() {

    return <LogoutClient>
        <Loader />
    </LogoutClient>
}

