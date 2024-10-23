import Button from "@comps/client/button";
import Loader from "@comps/server/loader";

type ButtonProps = {
    label: string;
    loading: boolean;
    disabled: boolean;
};

export default function LoadingButton(props: ButtonProps) {
    const { label, loading, disabled } = props;

    return (
        <Button type="submit" disabled={disabled} className="flex items-center justify-center gap-2">
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
