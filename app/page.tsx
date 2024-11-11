import HomeClient from "./client";
import Image from "next/image";

export default async function HomePage() {
    return (
        <>
            <Image src={"logo.svg"} className="aspect-[5/3] object-cover" height={200} width={200} alt="logo" />
            <div className="flex gap-2">
                <HomeClient />
            </div>
        </>
    );
}
