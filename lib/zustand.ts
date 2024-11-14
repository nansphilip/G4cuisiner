"use client";

import { FavoriteStoreProps } from "@comps/client/favorite-add";
import { ReviewListStoreProps } from "@comps/client/review-display";
import { create } from "zustand";

interface SwitchState {
    switchState: boolean;
    setSwitchState: (state: boolean) => void;
}

interface ReviewListState {
    reviewListStore: ReviewListStoreProps;
    setReviewListStore: (list: ReviewListStoreProps) => void;
}

interface FavoriteState {
    favoriteStore: FavoriteStoreProps;
    setFavoriteStore: (state: FavoriteStoreProps) => void;
}

interface RatingState {
    ratingStore: [number, Date];
    setRatingStore: (state: [number, Date]) => void;
}

export const useStore = create<SwitchState & ReviewListState & FavoriteState & RatingState>((set) => ({
    switchState: false,
    setSwitchState: (state) => set({ switchState: state }),

    reviewListStore: [[], new Date(0)],
    setReviewListStore: (list) => set({ reviewListStore: list }),

    favoriteStore: [false, new Date(0)],
    setFavoriteStore: (state) => set({ favoriteStore: state }),

    ratingStore: [0, new Date(0)],
    setRatingStore: (state) => set({ ratingStore: state }),
}));
