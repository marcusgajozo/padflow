import { CardBaseSkeleton } from "@/components/atoms/card-base-skeleton";
import { ToneCard } from "@/components/molecules/tone-card";
import { CardGrid } from "@/components/organisms/card-grid";
import { TYPES_EVENTS_CHANNEL } from "@/lib/constants/channel";
import { padsContinuos } from "@/lib/constants/pads";
import { useRemoteControlStore } from "@/lib/stores/use-remote-control-store";
import { useToneStore } from "@/lib/stores/use-tone-store";

type PadKey = keyof typeof padsContinuos;

const MUSICAL_KEYS = Object.entries(padsContinuos).map(([key]) => key);

export function Tones() {
  const channelControl = useRemoteControlStore((state) => state.channelControl);
  const isRemoteControl = useRemoteControlStore(
    (state) => state.isRemoteControl
  );

  const activeTone = useToneStore((state) => state.activeTone);
  const tonesIsloading = useToneStore((state) => state.tonesIsloading);

  const playTone = useToneStore((state) => state.playTone);

  const handleToneToggle = (tone: PadKey) => {
    if (isRemoteControl && channelControl) {
      channelControl.send({
        type: "broadcast",
        event: TYPES_EVENTS_CHANNEL.PLAY_TONE,
        payload: { key: tone },
      });
      return;
    }
    playTone?.(tone);
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
          <>
            {tonesIsloading && <CardBaseSkeleton className="h-2 w-50" />}
            {!tonesIsloading && (
              <ToneCard
                key={`tone-${tone}-${index}`}
                tone={tone as PadKey}
                active={activeTone === tone}
                onToneToggle={() => handleToneToggle(tone as PadKey)}
              />
            )}
          </>
        ))}
      </CardGrid>
    </div>
  );
}
