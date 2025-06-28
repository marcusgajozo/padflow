import { useState } from "react";
import { CardGrid } from "@/components/organisms/card-grid";
import { ToneCard } from "@/components/molecules/tone-card";

const MUSICAL_KEYS = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export function Tones() {
  const [activeTone, setActiveTone] = useState<string | null>(null);

  const handleToneClick = (tone: string) => {
    setActiveTone(activeTone === tone ? null : tone);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
          Musical Tones
        </h2>
        <p className="text-slate-400">
          Select a key for continuous ambient background pads
        </p>
      </div>

      <CardGrid>
        {MUSICAL_KEYS.map((tone) => (
          <ToneCard
            key={tone}
            tone={tone}
            active={activeTone === tone}
            onClick={() => handleToneClick(tone)}
          />
        ))}
      </CardGrid>
    </div>
  );
}
