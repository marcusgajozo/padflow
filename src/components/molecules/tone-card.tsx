import { CardBase } from "@/components/atoms/card-base";
import type { padsContinuos } from "@/lib/constants/pads";

type PadKey = keyof typeof padsContinuos;
interface ToneCardProps {
  active: boolean;
  tone: PadKey;
  onToneToggle?: () => void;
}

export function ToneCard({ tone, active, onToneToggle }: ToneCardProps) {
  return (
    <CardBase active={active} onClick={onToneToggle} className="aspect-square">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold">{tone}</h2>
        <div className="text-slate-300 text-sm mt-2 opacity-75">Key</div>
      </div>
    </CardBase>
  );
}
