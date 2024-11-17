"use client";

import { combo } from "@lib/combo";
import Link from "next/link";

type ButtonProps = {
    id?: string;
    type: "button" | "submit" | "link";
    href?: string | never;
    variant?: "default" | "outline" | "ghost" | "danger" | "link" | "transparent";
    buttonSize?: "none" | "sm" | "md" | "lg";
    fontSize?: "xs" | "sm" | "md" | "lg" | "xl";
    roundedSize?: "none" | "default" | "md" | "lg";
    ring?: "default" | "none";
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
} & (
    | {
          // If type "link"
          type: "link";
          href: string;
      }
    | {
          // If type "button" or "submit"
          type: "button" | "submit";
          href?: never;
      }
);

export default function Button(props: ButtonProps) {
    const {
        id,
        type,
        href,
        variant = "default",
        buttonSize = "md",
        fontSize = "md",
        roundedSize = "default",
        ring = "default",
        className = "",
        disabled = false,
        children,
        onClick,
        onMouseEnter,
        onMouseLeave,
    } = props;

    const ringClass = {
        default: "ring-transparent active:ring-teal-400 ring-offset-2 active:ring-2 disabled:ring-0",
        none: "",
    };

    const variantClass = {
        default: "bg-black text-white hover:bg-gray-700 disabled:bg-gray-700 disabled:text-gray-300",
        outline: "border bg-white hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400",
        ghost: "hover:bg-gray-200 bg-white disabled:bg-gray-200 disabled:text-gray-700",
        danger: "bg-red-500 text-white hover:bg-red-700 disabled:bg-red-700 disabled:text-gray-300",
        link: "text-gray-500 decoration-gray-500 hover:underline disabled:text-gray-300 disabled:no-underline",
        transparent: "",
    };

    const buttonSizeClass = {
        none: "",
        sm: "px-1",
        md: "px-2",
        lg: "px-4 py-1",
    };

    const fontSizeClass = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
    };

    const roundedClass = {
        none: "",
        default: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
    };

    if (type === "link") {
        return (
            <Link
                id={id}
                href={href}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={combo(
                    "text-center transition-all duration-150",
                    ringClass[ring],
                    variantClass[variant],
                    buttonSizeClass[buttonSize],
                    fontSizeClass[fontSize],
                    roundedClass[roundedSize],
                    className
                )}
            >
                {children}
            </Link>
        );
    } else {
        return (
            <button
                id={id}
                type={type}
                disabled={disabled}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={combo(
                    "text-center transition-all duration-150",
                    ringClass[ring],
                    variantClass[variant],
                    buttonSizeClass[buttonSize],
                    fontSizeClass[fontSize],
                    roundedClass[roundedSize],
                    className
                )}
            >
                {children}
            </button>
        );
    }
}
