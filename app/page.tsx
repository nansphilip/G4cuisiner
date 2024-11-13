import {getSession} from "@lib/auth";
import HomeClient from "./client";
import logo from "@public/logo.svg";
import Image from 'next/image';

export default async function HomePage() {
    const session = await getSession();

    return (
        <>
            <div
                className="absolute top-0 left-0 h-screen w-screen bg-cover bg-center -z-10"
                style={{
                    backgroundImage: "url('/background.jpg')",
                    opacity: 0.5
                }}
            ></div>
            <div className="flex flex-col w-full items-center justify-center gap-2">
                <div className="flex justify-center">
                    <Image
                        src={logo}
                        height={250}
                        width={250}
                        alt="logo"
                    />
                </div>
                <div className="flex flex-col justify-center gap-2">
                        <HomeClient/>
                    </div>
                </div>
        </>
    );
}