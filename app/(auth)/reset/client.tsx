import { useSession } from "@/auth-client";
import { useRouter } from "next/navigation";

export default function ResetClient () {
    const router = useRouter();
    const {data: session} = useSession();

    if (session) {
        router.push("/dashboard");
    }

    return <></>;
}