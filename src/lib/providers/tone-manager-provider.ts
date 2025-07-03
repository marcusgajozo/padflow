import { padsContinuos } from "@/lib/constants/pads";
import { useEffect, useRef } from "react";
import { Players } from "tone";
import { useToneStore } from "../stores/use-tone-store";

interface ToneManagerProviderProps {
  children?: React.ReactNode;
}

export function ToneManagerProvider({ children }: ToneManagerProviderProps) {
  const tonesIsloading = useToneStore((state) => state.tonesIsloading);
  const playersRef = useRef<Players | null>(null);

  const setActiveTone = useToneStore((state) => state.setActiveTone);
  const setPlayTone = useToneStore((state) => state.setPlayTone);
  const setTonesIsloading = useToneStore((state) => state.setTonesIsloading);

  useEffect(() => {
    console.log("🧹 Criando o players de tons.");

    const players = new Players({
      urls: padsContinuos,
      fadeIn: 0.3,
      fadeOut: 0.6,
      onload() {
        setTonesIsloading(false);
      },
    }).toDestination();

    playersRef.current = players;

    return () => {
      console.log("🧹 Limpando o players de tons.");
      players.dispose();
    };
  }, [setTonesIsloading]);

  useEffect(() => {
    const players = playersRef.current;
    if (!players) return;

    console.log("🔊 entrei som carregado", tonesIsloading);
    setPlayTone((tone) => {
      setActiveTone(tone);
      const player = players.player(tone);
      if (player) {
        player.loop = true;
        if (player.state === "started") {
          player.stop();
        } else {
          players.stopAll();
          player.start();
        }
      }
    });
  }, [tonesIsloading, setActiveTone, setPlayTone]);

  return children;
}
