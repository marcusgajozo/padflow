import { AddPadButton } from "@/components/molecules/add-pad-button";
import { EffectCard } from "@/components/molecules/effect-card";
import { CardGrid } from "@/components/organisms/card-grid";
import { useEffectStore } from "@/lib/stores/use-effect-store";
import { useEffect } from "react";

export function Effects() {
  const effectPads = useEffectStore((state) => state.effectPads);
  const addNewPad = useEffectStore((state) => state.addNewPad);
  const initializePads = useEffectStore((state) => state.initializePads);
  const isInitialized = useEffectStore((state) => state.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
      initializePads();
    }
  }, [isInitialized, initializePads]);

  const handleFileSelected = (file: File) => {
    addNewPad(file);
  };

  if (!isInitialized) {
    return <div>Carregando pads...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
          Effect Soundboard
        </h2>
        <p className="text-slate-400">
          Create your custom soundboard with one-shot effects
        </p>
      </div>

      <CardGrid>
        {effectPads.map((pad) => (
          <EffectCard key={pad.id} audioFile={pad.audioFile} name={pad.name} />
        ))}
        <AddPadButton onFileSelected={handleFileSelected} />
      </CardGrid>
    </div>
  );
}
