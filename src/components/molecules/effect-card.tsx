import { CardBase } from "@/components/atoms/card-base";
import { Icon } from "@/components/atoms/icon";
import { Volume2 } from "lucide-react";

interface EffectCardProps {
  onPlayEfeect: () => void;
  name: string;
}

export function EffectCard({ onPlayEfeect, name }: EffectCardProps) {
  return (
    <CardBase onClick={onPlayEfeect} className="aspect-square group">
      <div className="text-center text-white">
        <Icon icon={Volume2} size="lg" className="mx-auto mb-2" />
        <div className="text-sm font-medium truncate px-2 max-w-full">
          {name}
        </div>
      </div>
    </CardBase>
  );
}
