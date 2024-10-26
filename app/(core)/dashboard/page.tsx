import Button from "@comps/client/button";
import { getSession } from "@lib/auth";
import { redirect } from "next/navigation";
import { CircleAlert, CircleCheck } from "lucide-react";
import TimerClient from "@comps/client/timer";
import { combo } from "@lib/combo";

export default async function DashboardPage() {
    const session = await getSession();
    if (!session) redirect("/login");

    const name = session.user.name;
    const email = session.user.email;
    const emailVerified = session.user.emailVerified;

    const timerList: {
        type: "Created" | "Updated" | "Expires";
        date: Date;
    }[] = [
        { type: "Created", date: session.user.createdAt },
        { type: "Updated", date: session.user.updatedAt },
        { type: "Expires", date: session.session.expiresAt },
    ];

    return (
        <>
            <div className="flex w-[240px] flex-col items-start justify-center gap-2 rounded-xl border p-4 shadow">
                <h2 className="text-2xl font-bold">User</h2>
                <div className="flex w-full flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs">Name</p>
                        <span className="font-semibold">{name}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs">Email</p>
                        <span className="font-semibold">{email}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs">Verified</p>
                        <div
                            className={combo(
                                "flex items-center justify-start gap-1 font-semibold",
                                emailVerified ? "text-green-500" : "text-red-500"
                            )}
                        >
                            {emailVerified ? (
                                <>
                                    <span>Yes</span>
                                    <CircleCheck size={16} />
                                </>
                            ) : (
                                <>
                                    <span>No</span>
                                    <CircleAlert size={16} />
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs">Session</p>
                        <div className="flex flex-col gap-2">
                            {timerList.map(({ type, date }, index) => {
                                return <DisplayTimer key={index} sessionDate={date} type={type} text="ago" />;
                            })}
                        </div>
                    </div>
                </div>
                <Button type="link" href="/logout" variant="outline">
                    Logout
                </Button>
            </div>
        </>
    );
}

type TimerClientProps = {
    sessionDate: Date;
    type: "Created" | "Updated" | "Expires";
    text: "ago" | "left";
};

const DisplayTimer = (props: TimerClientProps) => {
    const { sessionDate, type, text } = props;

    return (
        <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold">{type}</span>
            <div className="flex flex-col items-end justify-center">
                <TimerClient sessionDate={sessionDate} type={type} className="text-sm" />
                <TimerClient sessionDate={sessionDate} type={type} text={text} className="text-xxs" />
            </div>
        </div>
    );
};
