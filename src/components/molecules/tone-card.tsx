import { CardBase } from "@/components/atoms/card-base";

interface ToneCardProps {
  tone: string;
  active: boolean;
  onClick: () => void;
}

export function ToneCard({ tone, active, onClick }: ToneCardProps) {
  return (
    <CardBase active={active} onClick={onClick} className="aspect-square">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold">{tone}</h2>
        <div className="text-slate-300 text-sm mt-2 opacity-75">Key</div>
      </div>
    </CardBase>
  );
}
