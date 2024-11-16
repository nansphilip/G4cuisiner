import Button from "@comps/server/button";
import { combo } from "@lib/combo";
import Loader from "@comps/server/loader";

type ButtonProps = {
    type: "button" | "submit";
    label: string;
    loading: boolean;
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
};

export default function LoadingButton(props: ButtonProps) {
    const { type, label, loading, disabled = null, className, onClick } = props;

    return (
        <Button
            type={type}
            disabled={disabled ?? loading}
            className={combo("flex items-center justify-center gap-2", className)}
            onClick={onClick}
        >
            {loading ? (
                <>
                    <Loader />
                    <span>Loading...</span>
                </>
            ) : (
                <>{label}</>
            )}
        </Button>
    );
}
