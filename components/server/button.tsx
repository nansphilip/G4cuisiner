import Link from "next/link";
import { combo } from "../../lib/combo";

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
    props?: React.LinkHTMLAttributes<HTMLLinkElement> | React.ButtonHTMLAttributes<HTMLButtonElement>;
} & (
    | {
          // If type "link"
          type: "link";
          href: string;
          props?: React.LinkHTMLAttributes<HTMLLinkElement>;
      }
    | {
          // If type "button" or "submit"
          type: "button" | "submit";
          href?: never;
          props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
      }
);

export default function Button(props: ButtonProps) {
    const {
        type,
        href,
        variant = "default",
        buttonSize = "md",
        fontSize = "md",
        roundedSize = "default",
        ring = "default",
        className = "",
        children,
        ...others
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

    const classList = combo(
        "text-center transition-all duration-150",
        ringClass[ring],
        variantClass[variant],
        buttonSizeClass[buttonSize],
        fontSizeClass[fontSize],
        roundedClass[roundedSize],
        className
    );

    if (type === "link") {
        return (
            <Link href={href} className={classList} {...others}>
                {children}
            </Link>
        );
    } else {
        return (
            <button className={classList} {...others}>
                {children}
            </button>
        );
    }
}
