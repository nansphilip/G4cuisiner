import { combo } from "@lib/combo";

export type FormFeedbackProps = {
    mode: "hidden" | "success" | "danger" | "warning",
    className?: string
    children: React.ReactNode,
}

export default function FormFeedback(props: FormFeedbackProps) {

    const {mode, className, children} = props;

    if (mode === "hidden") return <></>

    const color = {
        "success":  "bg-green-200 border-green-400",
        "danger": "bg-red-200 border-red-400",
        "warning": "bg-orange-200 border-orange-400",
    }

    return <div className={combo('border w-full rounded px-2 text-sm', color[mode], className)}>
        {children}
    </div>
}