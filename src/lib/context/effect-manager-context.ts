import { createContext } from "react";

interface EffectManagerContextType {
  play: (id: string) => void;
}

export const EffectManagerContext =
  createContext<EffectManagerContextType | null>(null);
