"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChefHat, ChevronDown, Search, X } from "lucide-react";
import { combo } from "@lib/combo";
import SlidingHover from "@comps/client/sliding-motion";
import ButtonClient from "@comps/client/button";
import { BetterSessionClient, useSession } from "@lib/client";
import { TitleAndSlugRecipeType } from "@actions/types/Recipe";
import SearchClient from "@app/(search)/search-page/client";
import Image from "next/image";
import Link from "next/link";

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
    slugList: TitleAndSlugRecipeType[];
    slugPageList: {
        group: string;
        route: string;
        slugList: TitleAndSlugRecipeType[];
    }[];
    isUserAdmin: boolean | null;
    className?: string;
};

export default function HeaderClient(props: HeaderClientProps) {
    const { slugList, isUserAdmin, className } = props;
    const { data: session } = useSession();

    // const slugLinkList = slugPageList.map(({ group, route, slugList }) => ({
    //     label: group,
    //     href: `${route}/${slugList[0].slug}`,
    //     group: slugList.map(({ title, slug }) => ({
    //         label: title,
    //         href: `${route}/${slug}`,
    //     })),
    // }));

    const linkList: LinkPropsList = [
        { label: "Accueil", href: "/" },
        {
            label: "Recherche",
            href: "/search",
            group: [
                { label: "Recherche par filtres", href: "/search-with-filters" },
                { label: "Qu'est ce qu'on mange ce soir ?", href: "/search-form" },
            ],
        },
        /* {
            label: "Exemples",
            href: "/fruits",
            group: [
                { label: "Cropper", href: "/cropper" },
                { label: "Zustand Set", href: "/zustand-set" },
                { label: "Zustand Get", href: "/zustand-get" },
                { label: "Display Fruits", href: "/fruits" },
                { label: "Server Fruits", href: "/random-fruit" },
            ],
        }, */
        // ...slugLinkList,
        {
            label: "Mon compte",
            href: "/favorites",
            group: [
                {
                    label: "Création recette",
                    href: "/recipe/create",
                    sessionActive: true,
                },
                // {
                //     label: "Édition recette",
                //     href: "/recipe/edit",
                //     sessionActive: true,
                // },
                // { label: "Favoris", href: "/favorites", sessionActive: true },
                { label: "Dashboard", href: "/dashboard", sessionActive: true },
                // {
                //     label: "Profil",
                //     href: "/profile",
                //     sessionActive: true,
                // },
                { label: "Déconnexion", href: "/logout", sessionActive: true },
            ],
        },
        {
            label: "Authentification",
            href: "/login",
            group: [
                { label: "Se connecter", href: "/login", sessionActive: false },
                {
                    label: "S'inscrire",
                    href: "/register",
                    sessionActive: false,
                },
            ],
        },
    ];

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const firstName = session?.user.name.split(" ")[0];
    const profileImage = session?.user.image;

    return (
        <header className={className}>
            <div className="md:hidden">
                <nav
                    className={combo(
                        "absolute bottom-0 rounded-t-2xl flex flex-col gap-2 border-1.5 z-50 w-full bg-white p-3",
                        !isMobileMenuOpen && "hidden"
                    )}
                >
                    <div className="flex flex-row items-center gap-2">
                        <span className="w-full text-lg font-bold">Navigation</span>
                        <ButtonClient
                            type="button"
                            className="py-1.5"
                            variant="ghost"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X />
                        </ButtonClient>
                    </div>
                    <ButtonClient
                        type="link"
                        href="/"
                        variant="outline"
                        className="py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Accueil
                    </ButtonClient>
                    <ButtonClient
                        type="link"
                        href="/search-with-filters"
                        variant="outline"
                        className="py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Recherche par filtres
                    </ButtonClient>
                    <ButtonClient
                        type="link"
                        href="/search-form"
                        variant="outline"
                        className="py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Qu&apos;est ce qu&apos;on mange ce soir ?
                    </ButtonClient>
                    {session ? (
                        <>
                            <ButtonClient
                                type="link"
                                href="/create-recipe"
                                variant="outline"
                                className="py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Création recette
                            </ButtonClient>
                            {/* <ButtonClient
                                type="link"
                                href="/edit-recipe"
                                variant="outline"
                                className="py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Édition recette
                            </ButtonClient> */}
                            {isUserAdmin && (
                                <ButtonClient
                                    type="link"
                                    href="/dashboard"
                                    variant="outline"
                                    className="py-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Dashboard
                                </ButtonClient>
                            )}
                            <ButtonClient
                                type="link"
                                href="/logout"
                                variant="outline"
                                className="py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Déconnexion
                            </ButtonClient>
                        </>
                    ) : (
                        <>
                            <ButtonClient
                                type="link"
                                href="/login"
                                variant="outline"
                                className="py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Se connecter
                            </ButtonClient>
                            <ButtonClient
                                type="link"
                                href="/register"
                                variant="outline"
                                className="py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                S&apos;inscrire
                            </ButtonClient>
                        </>
                    )}
                </nav>
                <ButtonClient
                    type="button"
                    className={combo(
                        "absolute bottom-8 right-8 rounded-full border-2 bg-white p-4 shadow-lg z-50",
                        isMobileMenuOpen && "hidden"
                    )}
                    variant="transparent"
                    ring="none"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <ChefHat />
                </ButtonClient>
            </div>
            <nav className="flex justify-center bg-secondary py-3 max-md:hidden">
                <Link href="/" className="absolute left-5 top-1.5 flex items-center gap-2">
                    <Image src="/logo-mobile.svg" width={40} height={40} alt="Logo" />
                </Link>
                <SlidingHover
                    className="flex items-start justify-center gap-1"
                    color="bg-gray-200"
                    rounded="rounded-md"
                    duration="duration-200"
                >
                    {linkList.map((linkOrGroup, index) => (
                        <HeaderDisplay
                            key={index}
                            isUserAdmin={isUserAdmin}
                            index={index}
                            linkOrGroup={linkOrGroup}
                            session={session}
                        />
                    ))}
                    <ButtonClient
                        type="button"
                        variant="transparent"
                        className="relative z-30 py-1"
                        ring="none"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <Search />
                    </ButtonClient>
                </SlidingHover>
                <SearchClient
                    className={combo(
                        "absolute border-1.5 border-gray-400 shadow-lg rounded-xl top-16 w-[300px]",
                        !isSearchOpen && "hidden"
                    )}
                    recipeList={slugList}
                />
                {session?.user && (
                    <Link
                        href={"/favorites"}
                        className="absolute right-5 top-[10px] flex flex-row items-center gap-4 rounded-full transition-all duration-150 hover:bg-gray-200 lg:pl-4"
                    >
                        <span className="whitespace-nowrap font-semibold max-lg:hidden">Bonjour, {firstName} !</span>
                        <div className="flex items-center justify-center overflow-hidden rounded-full">
                            {profileImage ? (
                                <Image
                                    src={profileImage}
                                    height={36}
                                    width={36}
                                    alt="Profile"
                                    className="rounded-full object-cover"
                                />
                            ) : (
                                <span className="flex size-9 items-center justify-center bg-tertiary font-bold text-white">
                                    {firstName?.[0].toUpperCase()}
                                </span>
                            )}
                        </div>
                    </Link>
                )}
            </nav>
            {/* <div className="absolute z-10 h-2 w-full bg-gradient-to-b from-white to-transparent"></div> */}
        </header>
    );
}

type HeaderDisplayProps = {
    index: number;
    linkOrGroup: LinkProps | LinkGroup;
    session: BetterSessionClient["data"];
    isUserAdmin: boolean | null;
};

const HeaderDisplay = (props: HeaderDisplayProps) => {
    // Get the current pathname
    const pathname = usePathname();

    // Toggle popup display
    const [isOpen, setIsOpen] = useState(false);

    // Destructure props
    const { index, linkOrGroup, isUserAdmin, session } = props;

    useEffect(() => {
        if ("group" in linkOrGroup && isOpen) {
            // Set offset
            const offset = 8;

            // Get popup elements
            const buttonEl = document.querySelector(`#popup-btn-${index}`) as HTMLElement;
            const navigationEl = document.querySelector(`#popup-nav-${index}`) as HTMLElement;
            const backgroundEl = document.querySelector(`#popup-bg-${index}`) as HTMLElement;
            const hoverZoneEl = document.querySelector(`#popup-hov-${index}`) as HTMLElement;

            // Check if elements exist to prevent a rendering error
            if (!buttonEl || !navigationEl || !backgroundEl || !hoverZoneEl) {
                return;
            }

            // Get the largest link element width
            const subButtonLinkList = Array.from(navigationEl.querySelectorAll("a")) as HTMLElement[];
            const subButtonWidthList = subButtonLinkList.map((element) => element.scrollWidth);
            const largestSubButtonWidth = subButtonWidthList.reduce((a, b) => Math.max(a, b));

            // Get button dimensions and position
            const buttonRect = buttonEl.getBoundingClientRect();
            const buttonHeight = buttonRect.height;
            const buttonWidth = buttonRect.width;
            const buttonTop = buttonRect.top;
            const buttonLeft = buttonRect.left;

            // Get the largest width between the largest link and the button
            const subButtonIsLarger = largestSubButtonWidth > buttonWidth ? "auto" : null;

            // Set navigation dimensions and position
            navigationEl.style.top = `${buttonTop + buttonHeight + offset}px`;
            navigationEl.style.width = subButtonIsLarger ?? `${buttonWidth}px`;
            if (subButtonIsLarger) {
                // Center the navigation popup
                navigationEl.style.left = `${buttonLeft - (largestSubButtonWidth - buttonWidth) / 2 - 8}px`;
            }

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
            hoverZoneEl.style.width = `${navigationWidth}px`;
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
                <ButtonClient
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
                </ButtonClient>
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
                        <HeaderLink key={index} isUserAdmin={isUserAdmin} link={groupLink} session={session} />
                    ))}
                </div>
                {/* Background popup */}
                <div
                    id={`popup-bg-${index}`}
                    className={combo(
                        "bg-white opacity-100 absolute z-20 duration-200 transition-opacity rounded-lg",
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
        return <HeaderLink isUserAdmin={isUserAdmin} link={link} session={session} />;
    }
};

type HeaderLinkProps = {
    link: LinkProps;
    session: BetterSessionClient["data"];
    isUserAdmin: boolean | null;
};

const HeaderLink = (props: HeaderLinkProps) => {
    const { link, isUserAdmin, session } = props;
    const { label, href, sessionActive = undefined } = link;

    // Get the current pathname
    const pathname = usePathname();

    // Display the button only if the session is active or not
    const displayButton =
        (session && sessionActive) || // If session is active and sessionActive is true
        (!session && !sessionActive) || // If session is not active and sessionActive is false
        sessionActive === undefined; // If sessionActive is undefined

    if (!displayButton) return <></>;
    if (label === "Dashboard" && !isUserAdmin) return <></>;

    return (
        <ButtonClient
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
        </ButtonClient>
    );
};
