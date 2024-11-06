import HomeClient from "./client";
import logo  from "@public/logo.svg";
import Image from 'next/image';

export default async function HomePage() {
    return (
        <>
            <Image
                src ={logo}
                height={200}
                width={200}
                alt="logo"
                />
            <div className="flex gap-2">
                <HomeClient />
            </div>
        </>
    );
}
