import { CardBase } from "@/components/atoms/card-base";
import { Icon } from "@/components/atoms/icon";
import { useEffectPlayer } from "@/lib/hooks/use-effect-player";
import { Volume2 } from "lucide-react";

interface EffectCardProps {
  name: string;
  audioFile: File;
}

export function EffectCard({ name, audioFile }: EffectCardProps) {
  const { play } = useEffectPlayer(audioFile);

  return (
    <CardBase onClick={play} className="aspect-square group">
      <div className="text-center text-white">
        <Icon icon={Volume2} size="lg" className="mx-auto mb-2" />
        <div className="text-sm font-medium truncate px-2 max-w-full">
          {name}
        </div>
      </div>
    </CardBase>
  );
}
