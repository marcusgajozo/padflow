import { CardBase } from "@/components/atoms/card-base";
import { Icon } from "@/components/atoms/icon";
import { Upload, Volume2 } from "lucide-react";

interface EffectCardProps {
  id: string;
  audioFile?: File;
  onFileUpload: (id: string, file: File) => void;
  onDelete: (id: string) => void;
  onPlay: (id: string) => void;
}

export function EffectCard({
  id,
  audioFile,
  onFileUpload,
  onPlay,
}: EffectCardProps) {
  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        onFileUpload(id, file);
      }
    };
    input.click();
  };

  if (!audioFile) {
    return (
      <CardBase
        variant="empty"
        onClick={handleFileUpload}
        className="aspect-square"
      >
        <div className="text-center text-slate-400">
          <Icon icon={Upload} size="lg" className="mx-auto mb-2" />
          <div className="text-sm">Click to assign sound</div>
        </div>
      </CardBase>
    );
  }

  return (
    <CardBase onClick={() => onPlay(id)} className="aspect-square group">
      <div className="text-center text-white">
        <Icon icon={Volume2} size="lg" className="mx-auto mb-2" />
        <div className="text-sm font-medium truncate px-2 max-w-full">
          {audioFile.name.replace(/\.[^/.]+$/, "")}
        </div>
      </div>
    </CardBase>
  );
}
