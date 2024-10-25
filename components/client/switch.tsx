import Button from "@comps/client/button";
import { combo } from "@lib/combo";

type SwitchProps = {
    checked: boolean;
    setCheck: (checked: boolean) => void;
    size?: "sm" | "md" | "lg";
    className?: string;
};

export default function Switch(props: SwitchProps) {
    const { checked, setCheck, size = "md", className } = props;

    const sizeClass = {
        sm: {
            switch: "w-7 border p-0.5",
            bubble: "size-2",
            translation: "translate-x-[14px]",
        },
        md: {
            switch: "w-12 border-2 p-1",
            bubble: "size-3",
            translation: "translate-x-[24px]",
        },
        lg: {
            switch: "w-14 border-2 p-1",
            bubble: "size-4",
            translation: "translate-x-[28px]",
        }
    };

    return (
        <Button
            type="button"
            variant="transparent"
            ring="none"
            onClick={() => setCheck(!checked)}
            className={combo(
                "group rounded-full shadow-md shadow-gray-200 border-gray-300 transition-all duration-150 hover:border-gray-500",
                sizeClass[size].switch
            )}
        >
            <div
                className={combo(
                    "rounded-full bg-gray-700 group-hover:bg-black transition-all duration-150",
                    sizeClass[size].bubble,
                    checked ? sizeClass[size].translation : "",
                    className
                )}
            ></div>
        </Button>
    );
}
