import { useState, useRef } from "react";
import { CardGrid } from "@/components/organisms/card-grid";
import { EffectCard } from "@/components/molecules/effect-card";
import { AddPadButton } from "@/components/molecules/add-pad-button";

interface EffectPad {
  id: string;
  audioFile?: File;
}

export function Effects() {
  const [effectPads, setEffectPads] = useState<EffectPad[]>([]);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  const addNewPad = () => {
    const newPad: EffectPad = {
      id: `pad-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    setEffectPads((prev) => [...prev, newPad]);
  };

  const handleFileUpload = (id: string, file: File) => {
    setEffectPads((prev) =>
      prev.map((pad) => (pad.id === id ? { ...pad, audioFile: file } : pad))
    );

    // Create audio element for this file
    const audioUrl = URL.createObjectURL(file);
    const audio = new Audio(audioUrl);
    audioRefs.current[id] = audio;
  };

  const handleDelete = (id: string) => {
    setEffectPads((prev) => prev.filter((pad) => pad.id !== id));

    // Clean up audio reference
    if (audioRefs.current[id]) {
      audioRefs.current[id].pause();
      URL.revokeObjectURL(audioRefs.current[id].src);
      delete audioRefs.current[id];
    }
  };

  const handlePlay = (id: string) => {
    const audio = audioRefs.current[id];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(console.error);
    }
  };

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
          <EffectCard
            key={pad.id}
            id={pad.id}
            audioFile={pad.audioFile}
            onFileUpload={handleFileUpload}
            onDelete={handleDelete}
            onPlay={handlePlay}
          />
        ))}
        <AddPadButton onClick={addNewPad} />
      </CardGrid>
    </div>
  );
}
