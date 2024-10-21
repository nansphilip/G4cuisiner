"use client";

import { useStore } from "@comps/zustand";
import Switch from "@comps/client/switch";

export default function ZustandSetClient() {
    const { switchState, toggleSwitch } = useStore();

    return (
        <>
            <Switch checked={switchState} setCheck={async () => toggleSwitch()} />
            <span className="w-6 font-bold">{switchState ? "ON" : "OFF"}</span>
        </>
    );
}
