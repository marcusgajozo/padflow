import { Button } from "@/components/atoms/button";
import { useNavigate } from "react-router";

interface NavigationToggleProps {
  urlMode: string | undefined;
}

export function NavigationToggle({
  urlMode = undefined,
}: NavigationToggleProps) {
  const navigate = useNavigate();

  const handleModeChange = (screen: "tones" | "effects") => {
    navigate(screen);
  };

  return (
    <div className="flex bg-slate-800 rounded-xl p-1">
      <Button
        variant={urlMode === "/tones" ? "primary" : "ghost"}
        size="md"
        onClick={() => handleModeChange("tones")}
        className="flex-1"
      >
        Tones
      </Button>
      <Button
        variant={urlMode === "/effects" ? "primary" : "ghost"}
        size="md"
        onClick={() => handleModeChange("effects")}
        className="flex-1"
      >
        Effects
      </Button>
    </div>
  );
}
