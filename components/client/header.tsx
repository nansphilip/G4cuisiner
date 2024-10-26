"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { combo } from "@lib/combo";
import SlidingHover from "@comps/client/sliding-motion";
import Button from "@comps/client/button";
import { BetterSessionClient, useSession } from "@lib/client";
import { BetterSessionServer } from "@lib/auth";

type LinkProps = {
    label: string;
    href: string;
    sessionActive?: boolean;
};
type LinkGroup = {
    label: string;
    href: string;
    group: LinkProps[];
};
type LinkPropsList = (LinkProps | LinkGroup)[];

type HeaderClientProps = {
    serverSession: BetterSessionServer;
    slugPageList: {
        group: string;
        route: string;
        slugList: {
            name: string;
            slug: string;
        }[];
    }[];
};

export default function HeaderClient(props: HeaderClientProps) {
    const { serverSession, slugPageList } = props;
    const { data: sessionClient } = useSession();
    const session = sessionClient ?? serverSession;

    const slugLinkList = slugPageList.map(({ group, route, slugList }) => ({
        label: group,
        href: `${route}/${slugList[0].name}`,
        group: slugList.map(({name, slug }) => ({
            label: name,
            href: `${route}/${slug}`,
        })),
    }));

    const linkList: LinkPropsList = [
        { label: "Home", href: "/" },
        {
            label: "Zustand Examples",
            href: "/zustand-set",
            group: [
                { label: "Zustand Set", href: "/zustand-set" },
                { label: "Zustand Get", href: "/zustand-get" },
            ],
        },
        {
            label: "Fruits Exemples",
            href: "/fruits",
            group: [
                { label: "Display Fruits", href: "/fruits" },
                { label: "Server Fruits", href: "/random-fruit" },
            ],
        },
        {
            label: "Create recipe",
            href: "/create-recipe",
            sessionActive: true,
        },
        ...slugLinkList,
        {
            label: "My Account",
            href: "/dashboard",
            group: [
                { label: "Dashboard", href: "/dashboard", sessionActive: true },
                { label: "Profile", href: "/profile", sessionActive: true },
                { label: "Logout", href: "/logout", sessionActive: true },
            ],
        },
        {
            label: "Authentication",
            href: "/login",
            group: [
                { label: "Login", href: "/login", sessionActive: false },
                { label: "Register", href: "/register", sessionActive: false },
            ],
        },
    ];

    return (
        <header>
            <nav className="flex justify-center bg-white pb-1.5 pt-2">
                <SlidingHover
                    className="flex items-start justify-center gap-1"
                    color="bg-gray-200"
                    rounded="rounded-md"
                    duration="duration-200"
                >
                    {linkList.map((linkOrGroup, index) => (
                        <HeaderDisplay key={index} index={index} linkOrGroup={linkOrGroup} session={session} />
                    ))}
                </SlidingHover>
            </nav>
            <div className="absolute z-10 h-1 w-full bg-gradient-to-b from-white to-transparent"></div>
        </header>
    );
}

type HeaderDisplayProps = {
    index: number;
    linkOrGroup: LinkProps | LinkGroup;
    session: BetterSessionClient["data"];
};

const HeaderDisplay = (props: HeaderDisplayProps) => {
    // Get the current pathname
    const pathname = usePathname();

    // Toggle popup display
    const [isOpen, setIsOpen] = useState(false);

    // Destructure props
    const { index, linkOrGroup, session } = props;

    useEffect(() => {
        if ("group" in linkOrGroup && isOpen) {
            // Set offset
            const offset = 8;

            // Get popup elements
            const buttonEl = document.querySelector(`#popup-btn-${index}`) as HTMLElement;
            const navigationEl = document.querySelector(`#popup-nav-${index}`) as HTMLElement;
            const backgroundEl = document.querySelector(`#popup-bg-${index}`) as HTMLElement;
            const hoverZoneEl = document.querySelector(`#popup-hov-${index}`) as HTMLElement;

            // Get button dimensions and position
            const buttonRect = buttonEl.getBoundingClientRect();
            const buttonHeight = buttonRect.height;
            const buttonWidth = buttonRect.width;
            const buttonTop = buttonRect.top;

            // Set navigation dimensions and position
            navigationEl.style.top = `${buttonTop + buttonHeight + offset}px`;
            navigationEl.style.width = `${buttonWidth}px`;

            // Get navigation dimensions
            const navigationRect = navigationEl.getBoundingClientRect();
            const navigationHeight = navigationRect.height;
            const navigationWidth = navigationRect.width;
            const navigationTop = navigationRect.top;
            const navigationLeft = navigationRect.left;

            // Set background dimensions and position
            backgroundEl.style.height = `${navigationHeight}px`;
            backgroundEl.style.width = `${navigationWidth}px`;
            backgroundEl.style.top = `${navigationTop}px`;
            backgroundEl.style.left = `${navigationLeft}px`;

            // Set hover zone dimensions and position
            hoverZoneEl.style.height = `${offset}px`;
            hoverZoneEl.style.width = `${buttonWidth}px`;
            hoverZoneEl.style.top = `${buttonTop + buttonHeight}px`;
            hoverZoneEl.style.left = `${navigationLeft}px`;
        }
    }, [linkOrGroup, isOpen, index]);

    if ("group" in linkOrGroup) {
        const { label, href, group } = linkOrGroup;

        const displayGroup =
            // If session is active and at least one sessionActive is true
            (session && group.find(({ sessionActive }) => sessionActive)) ||
            // If session is not active and at least one sessionActive is false
            (!session && group.find(({ sessionActive }) => !sessionActive)) ||
            // If sessionActive is undefined
            group.find(({ sessionActive }) => sessionActive === undefined);

        if (!displayGroup) return <></>;

        return (
            <div className="flex flex-col gap-2">
                <Button
                    id={`popup-btn-${index}`}
                    {...(href ? { type: "link", href } : { type: "button" })}
                    variant="transparent"
                    buttonSize="lg"
                    fontSize="md"
                    roundedSize="md"
                    ring="none"
                    className={combo(
                        "relative z-30 flex gap-1 text-nowrap py-1",
                        group.filter((link) => pathname === link.href).length > 0 && "font-bold"
                    )}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <span>{label}</span>
                    <ChevronDown className={combo("transition-transform duration-300", isOpen && "-rotate-180")} />
                </Button>
                {/* Navigation popup */}
                <div
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    id={`popup-nav-${index}`}
                    className={combo(
                        "z-30 p-2 border absolute opacity-100 transition-opacity duration-200 flex flex-col gap-1 rounded-lg",
                        !isOpen && "opacity-0 pointer-events-none"
                    )}
                >
                    {group.map((groupLink, index) => (
                        <HeaderLink key={index} link={groupLink} session={session} />
                    ))}
                </div>
                {/* Background popup */}
                <div
                    id={`popup-bg-${index}`}
                    className={combo(
                        "bg-white opacity-100 absolute z-10 duration-200 transition-opacity rounded-lg",
                        !isOpen && "opacity-0 pointer-events-none"
                    )}
                ></div>
                {/* Hover zone */}
                <div
                    id={`popup-hov-${index}`}
                    className={combo("absolute z-30", !isOpen && "pointer-events-none")}
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                ></div>
            </div>
        );
    } else {
        const link: LinkProps = linkOrGroup;
        return <HeaderLink link={link} session={session} />;
    }
};

type HeaderLinkProps = {
    link: LinkProps;
    session: BetterSessionClient["data"];
};

const HeaderLink = (props: HeaderLinkProps) => {
    const { link, session } = props;
    const { label, href, sessionActive = undefined } = link;

    // Get the current pathname
    const pathname = usePathname();

    // Display the button only if the session is active or not
    const displayButton =
        (session && sessionActive) || // If session is active and sessionActive is true
        (!session && !sessionActive) || // If session is not active and sessionActive is false
        sessionActive === undefined; // If sessionActive is undefined

    if (!displayButton) return <></>;

    return (
        <Button
            type="link"
            variant="transparent"
            buttonSize="lg"
            fontSize="md"
            roundedSize="md"
            ring="none"
            href={href}
            className={combo("relative z-30 text-nowrap py-1", pathname === href && "font-bold")}
        >
            {label}
        </Button>
    );
};
