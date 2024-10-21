"use client";

import { create } from 'zustand';

interface StoreSwitchState {
  switchState: boolean;
  toggleSwitch: () => void;
}

export const useStore = create<StoreSwitchState>((set) => ({
  switchState: false,
  toggleSwitch: () => set((state) => ({ switchState: !state.switchState })),
}));