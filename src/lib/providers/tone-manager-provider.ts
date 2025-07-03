import { padsContinuos } from "@/lib/constants/pads";
import { useEffect } from "react";
import { Players } from "tone";
import { useToneStore } from "../stores/use-tone-store";

interface ToneManagerProviderProps {
  children?: React.ReactNode;
}

export function ToneManagerProvider({ children }: ToneManagerProviderProps) {
  const setActiveTone = useToneStore((state) => state.setActiveTone);
  const setPlayTone = useToneStore((state) => state.setPlayTone);

  useEffect(() => {
    console.log("🧹 Criando o players de tons.");

    const players = new Players({
      urls: padsContinuos,
    }).toDestination();

    Object.keys(padsContinuos).forEach((key) => {
      const player = players.player(key);
      player.loop = true;
      player.fadeIn = 0.3;
      player.fadeOut = 0.6;
    });

    setPlayTone((tone) => {
      setActiveTone(tone);
      const player = players.player(tone);
      if (player) {
        if (player.state === "started") {
          player.stop();
        } else {
          players.stopAll();
          player.start();
        }
      }
    });

    return () => {
      console.log("🧹 Limpando o players de tons.");
      players.dispose();
    };
  }, [setActiveTone, setPlayTone]);

  return children;
}
