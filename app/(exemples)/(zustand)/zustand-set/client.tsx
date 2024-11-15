"use client";

import { useStore } from "@lib/zustand";
import SwitchClient from "@comps/client/switch";

export default function ZustandSetClient() {
    const { switchState, setSwitchState } = useStore();

    return (
        <>
            <SwitchClient checked={switchState} setCheck={setSwitchState} />
            <span className="w-6 font-bold">{switchState ? "ON" : "OFF"}</span>
        </>
    );
}
