import { ToneCard } from "@/components/molecules/tone-card";
import { CardGrid } from "@/components/organisms/card-grid";
import { padsContinuos } from "@/lib/constants/pads";
import { useToneStore } from "@/lib/stores/use-tone-store";

type PadKey = keyof typeof padsContinuos;

const MUSICAL_KEYS = Object.entries(padsContinuos).map(([key]) => key);

export function Tones() {
  const setActiveTone = useToneStore((state) => state.setActiveTone);
  const activeTone = useToneStore((state) => state.activeTone);

  const handleToneToggle = (tone: PadKey) => {
    setActiveTone(activeTone === tone ? undefined : tone);
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
        {MUSICAL_KEYS.map((tone, index) => (
          <ToneCard
            key={`tone-${tone}-${index}`}
            tone={tone as PadKey}
            active={activeTone === tone}
            onToneToggle={() => handleToneToggle(tone as PadKey)}
          />
        ))}
      </CardGrid>
    </div>
  );
}
