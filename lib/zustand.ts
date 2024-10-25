"use client";

import { create } from "zustand";
import { BetterSessionClient } from "@lib/client";
import { BetterSessionServer } from "@lib/auth";

interface SwitchState {
    switchState: boolean;
    setSwitchState: (state: boolean) => void;
}

interface ClientSession {
    instantSession: BetterSessionClient["data"] | BetterSessionServer | undefined;
    setInstantSession: (session: BetterSessionClient["data"] | BetterSessionServer) => void;
}

export type InstantSessionClient = ClientSession["instantSession"];

export const useStore = create<SwitchState & ClientSession>((set) => ({
    switchState: false,
    setSwitchState: (state) => set({ switchState: state }),

    instantSession: undefined,
    setInstantSession: (session) => set({ instantSession: session }),
}));
