import { CardBase } from "@/components/atoms/card-base";
import { Icon } from "@/components/atoms/icon";
import { Plus } from "lucide-react";

interface AddPadButtonProps {
  onClick: () => void;
}

export function AddPadButton({ onClick }: AddPadButtonProps) {
  return (
    <CardBase variant="add" onClick={onClick} className="aspect-square">
      <div className="text-center text-slate-400">
        <Icon icon={Plus} size="lg" className="mx-auto mb-2" />
        <div className="text-sm font-medium">Add New Pad</div>
      </div>
    </CardBase>
  );
}
