import { create } from "zustand";
import type { padsContinuos } from "../constants/pads";

type PadKey = keyof typeof padsContinuos;

export interface ToneStoreState {
  activeTone?: PadKey;
  playTone: ((tone: PadKey) => void) | null;
}

export interface ToneStoreAction {
  setActiveTone: (tone: ToneStoreState["activeTone"]) => void;
  setPlayTone: (playTone: ToneStoreState["playTone"]) => void;
}

const INITIAL_STATE: ToneStoreState = {
  activeTone: undefined,
  playTone: null,
};

export const useToneStore = create<ToneStoreState & ToneStoreAction>()(
  (set) => ({
    ...INITIAL_STATE,
    setActiveTone: (tone) =>
      set(({ activeTone }) => ({
        activeTone: activeTone === tone ? undefined : tone,
      })),
    setPlayTone: (playTone) => set({ playTone }),
  })
);
