import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { del, get, keys, set } from "idb-keyval";

export interface EffectPad {
  id: string;
  name: string;
  audioFile: File;
}

interface EffectStoreState {
  activeEffectFile: File | null;
  effectPads: EffectPad[];
  isInitialized: boolean;
}

interface EffectStoreActions {
  initializePads: () => Promise<void>;
  addNewPad: (file: File) => Promise<void>;
  handleDelete: (id: string) => Promise<void>;
  setActiveEffect: (effectId: string) => void;
}

const INITIAL_EFFECT: EffectStoreState = {
  activeEffectFile: null,
  isInitialized: false,
  effectPads: [],
};

export const useEffectStore = create<EffectStoreState & EffectStoreActions>()(
  devtools(
    (setState) => ({
      ...INITIAL_EFFECT,

      initializePads: async () => {
        try {
          const padKeys = await keys();
          const pads: EffectPad[] = [];
          for (const key of padKeys) {
            if (typeof key === "string" && key.startsWith("effect-")) {
              const pad = await get<EffectPad>(key);
              if (pad) {
                pads.push(pad);
              }
            }
          }
          setState({ effectPads: pads, isInitialized: true });
        } catch (error) {
          console.error("Falha ao carregar pads do IndexedDB", error);
          setState({ isInitialized: true });
        }
      },

      addNewPad: async (file) => {
        const newPad: EffectPad = {
          id: `effect-${Date.now()}`,
          name: file.name.replace(/\.[^/.]+$/, ""),
          audioFile: file,
        };
        await set(newPad.id, newPad);
        setState((state) => ({
          effectPads: [...state.effectPads, newPad],
        }));
      },

      handleDelete: async (id) => {
        await del(id);
        setState((state) => ({
          effectPads: state.effectPads.filter((pad) => pad.id !== id),
        }));
      },

      setActiveEffect: async (effectId) => {
        const effect = await get<EffectPad>(effectId);
        if (effect) {
          setState({ activeEffectFile: effect.audioFile });
        }
      },
    }),
    { name: "effect-store" }
  )
);
