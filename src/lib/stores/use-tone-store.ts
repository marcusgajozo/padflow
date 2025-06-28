import { create } from "zustand";
import type { padsContinuos } from "../constants/pads";

type PadKey = keyof typeof padsContinuos;

export interface ToneStoreState {
  activeTone?: PadKey;
}

export interface ToneStoreAction {
  setActiveTone: (tone: ToneStoreState["activeTone"]) => void;
  resetActiveTone: () => void;
}

const INITIAL_STATE: ToneStoreState = {
  activeTone: undefined,
};

export const useToneStore = create<ToneStoreState & ToneStoreAction>()(
  (set) => ({
    ...INITIAL_STATE,
    setActiveTone: (tone) => set({ activeTone: tone }),
    resetActiveTone: () => set({ ...INITIAL_STATE }),
  })
);
