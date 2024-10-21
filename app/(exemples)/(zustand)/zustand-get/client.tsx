"use client";

import { useStore } from "@comps/zustand";

export default function ZustandGetClient() {
    const { switchState } = useStore();

    return <span className="font-bold">{switchState ? "ON" : "OFF"}</span>
}
