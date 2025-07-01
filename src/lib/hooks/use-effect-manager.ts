import { useContext } from "react";
import { EffectManagerContext } from "@/lib/context/effect-manager-context";

export const useEffectManager = () => {
  const context = useContext(EffectManagerContext);
  if (!context) {
    throw new Error(
      "useEffectsAudio deve ser usado dentro de um EffectsAudioProvider"
    );
  }
  return context;
};
