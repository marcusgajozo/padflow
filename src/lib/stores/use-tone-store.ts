import { create } from "zustand";
import type { padsContinuos } from "../constants/pads";

type PadKey = keyof typeof padsContinuos;

export interface ToneStoreState {
  activeTone?: PadKey;
  playTone: ((tone: PadKey) => void) | null;
  tonesIsloading: boolean;
}

export interface ToneStoreAction {
  setActiveTone: (tone: ToneStoreState["activeTone"]) => void;
  setPlayTone: (playTone: ToneStoreState["playTone"]) => void;
  setTonesIsloading: (tonesIsloading: ToneStoreState["tonesIsloading"]) => void;
}

const INITIAL_STATE: ToneStoreState = {
  activeTone: undefined,
  playTone: null,
  tonesIsloading: true,
};

export const useToneStore = create<ToneStoreState & ToneStoreAction>()(
  (set) => ({
    ...INITIAL_STATE,
    setActiveTone: (tone) =>
      set(({ activeTone }) => ({
        activeTone: activeTone === tone ? undefined : tone,
      })),
    setPlayTone: (playTone) => set({ playTone }),
    setTonesIsloading: (tonesIsloading) => set({ tonesIsloading }),
  })
);
