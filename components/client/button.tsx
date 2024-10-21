"use client"

import Link from "next/link"
import { combo } from "../combo"

export type variantType = "default" | "outline" | "ghost" | "danger" | "link" | "transparent"

type ButtonProps = {
    id?: string,
    type: "button" | "submit" | "link",
    href?: string | never,

    variant?: variantType,
    buttonSize?: "none" | "sm" | "md" | "lg",
    fontSize?: "xs" | "sm" | "md" | "lg" | "xl",
    roundedSize?: "none" | "default" | "md" | "lg",
    ring?: "default" | "none",
    className?: string,

    animation?: boolean,
    bgColor?: string,
    hovColor?: string,
    accentuate?: boolean,
    expandDuration?: number,
    collapseDuration?: number,
    frequency?: number,

    children?: React.ReactNode,
    disabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    onBlur?: React.FocusEventHandler<HTMLButtonElement>,
    onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>,
    onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>,
    props?: React.LinkHTMLAttributes<HTMLLinkElement> | React.ButtonHTMLAttributes<HTMLButtonElement>
} & ({
    // If  type "link"
    type: "link",
    href: string,
    props?: React.LinkHTMLAttributes<HTMLLinkElement>
} | {
    // If type "button" ou "submit"
    type: "button" | "submit",
    href?: never,
    props?: React.ButtonHTMLAttributes<HTMLButtonElement>
})

export default function Button({
    id,
    type,
    href,

    variant = "default",
    buttonSize = "md",
    fontSize = "md",
    roundedSize = "default",
    ring = "default",
    className = "",

    animation = false,
    bgColor = "#000000",
    hovColor = "#374151",
    accentuate = true,
    expandDuration = 500,
    collapseDuration = 500,
    frequency = 5,

    children,
    disabled,
    onClick,
    ...props
}: ButtonProps) {

    const ringClass = {
        default: "ring-teal-400 ring-offset-2 active:ring-2 disabled:ring-0",
        none: ""
    }

    const variantClass = {
        default: "bg-black text-white hover:bg-gray-800 disabled:bg-gray-800 disabled:text-gray-300",
        outline: "border bg-white hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-700",
        ghost: "hover:bg-gray-100 bg-white disabled:bg-gray-100 disabled:text-gray-700",
        danger: "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-600 disabled:text-gray-300",
        link: "text-gray-500 decoration-gray-500 hover:underline disabled:text-gray-400 disabled:no-underline",
        transparent: ""
    }

    const buttonSizeClass = {
        none: "",
        sm: "px-1",
        md: "px-2",
        lg: "px-4 py-1",
    }

    const fontSizeClass = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
    }

    const roundedClass = {
        none: "",
        default: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
    }

    const classList = combo(
        "text-center",
        ringClass[ring],
        variantClass[variant],
        buttonSizeClass[buttonSize],
        fontSizeClass[fontSize],
        roundedClass[roundedSize],
        className
    )

    if (type === "link") return <Link
        id={id}
        href={href}
        className={classList}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)} // Todo : why ?
    >
        {children}
    </Link>

    else return <button
        id={id}
        type={type}
        className={classList}
        disabled={disabled}
        onClick={(e) => {
            if (onClick) onClick(e)
            if (animation) wave(e, bgColor, hovColor, accentuate, expandDuration, collapseDuration, frequency)
        }}
        {...props}
    >
        {children}
    </button>
}



const wave = (e: React.MouseEvent<HTMLButtonElement>,
    bgColor : string,
    hovColor : string,
    accentuate: boolean,
    expandDuration: number,
    collapseDuration: number,
    frequency: number
) => {

    const buttonEl = e.target as HTMLButtonElement
    const position = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }

    const startTime = Date.now()
    const endTime = startTime + expandDuration

    // Start and update the radial effect
    const interval = setInterval(() => {
        // Calculate the percentage
        const percent = Math.round(((Date.now() - startTime) / expandDuration) * 100)
        // Set the radial gradient
        buttonEl.style.background = `radial-gradient(circle at ${position.x}px ${position.y}px, ${bgColor} 0%, ${bgColor} ${percent}%, ${hovColor} ${percent}%)`
        // Clear the interval
        if (Date.now() > endTime) clearInterval(interval)
    }, frequency)

    // Release the radial effect
    setTimeout(() => {
        buttonEl.style.background = bgColor
        // eslint
        buttonEl.offsetHeight
        buttonEl.style.transition = `background ${collapseDuration}ms`
        buttonEl.style.background = ""
        buttonEl.offsetHeight
    }, expandDuration)

    // Reset the animation
    setTimeout(() => {
        buttonEl.style.transition = ""
        buttonEl.style.background = ""
    }, expandDuration + collapseDuration)
}
