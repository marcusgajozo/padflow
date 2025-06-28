import { Button } from "@/components/atoms/button";
import { useNavigate } from "react-router";

interface NavigationToggleProps {
  activeMode: "tones" | "effects" | undefined;
}

export function NavigationToggle({
  activeMode = undefined,
}: NavigationToggleProps) {
  const navigate = useNavigate();

  const handleModeChange = (screen: "tones" | "effects") => {
    if (screen === "tones") {
      navigate("/tones");
    } else {
      navigate("/effects");
    }
  };

  return (
    <div className="flex bg-slate-800 rounded-xl p-1">
      <Button
        variant={activeMode === "tones" ? "primary" : "ghost"}
        size="md"
        onClick={() => handleModeChange("tones")}
        className="flex-1"
      >
        Tones
      </Button>
      <Button
        variant={activeMode === "effects" ? "primary" : "ghost"}
        size="md"
        onClick={() => handleModeChange("effects")}
        className="flex-1"
      >
        Effects
      </Button>
    </div>
  );
}
