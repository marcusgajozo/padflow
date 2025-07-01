import { EffectManagerContext } from "@/lib/context/effect-manager-context";
import { useEffectStore } from "@/lib/stores/use-effect-store";
import { useEffect, useRef, type ReactNode } from "react";
import { Players } from "tone";

export function EffectManagerProvider({ children }: { children: ReactNode }) {
  const playersRef = useRef<Players | null>(null);
  const urlMapRef = useRef<Map<string, string>>(new Map());

  const effectPads = useEffectStore((state) => state.effectPads);
  const initializePads = useEffectStore((state) => state.initializePads);
  const isInitialized = useEffectStore((state) => state.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
      initializePads();
    }
  }, [isInitialized, initializePads]);

  useEffect(() => {
    if (effectPads.length === 0) return;

    console.log("🔄 Recriando a coleção de players de efeitos...");

    const urls: { [key: string]: string } = {};

    effectPads.forEach((pad) => {
      const url = URL.createObjectURL(pad.audioFile);
      urls[pad.id] = url;
      urlMapRef.current.set(pad.id, url);
    });

    const newPlayers = new Players(urls, () => {
      console.log("✅ Todos os efeitos foram carregados/recarregados.");
    }).toDestination();

    playersRef.current = newPlayers;

    return () => {
      newPlayers.dispose();
      urlMapRef.current.forEach((url) => URL.revokeObjectURL(url));
      urlMapRef.current.clear();
    };
  }, [effectPads]);

  const play = async (id: string) => {
    const players = playersRef.current;
    if (players?.has(id)) {
      const player = players.player(id);
      if (player.state === "started") {
        player.restart();
      } else {
        player.start();
      }
    } else {
      console.warn(
        `Tentativa de tocar um efeito não carregado ou ainda em carregamento: ${id}`
      );
    }
  };

  return (
    <EffectManagerContext.Provider value={{ play }}>
      {children}
    </EffectManagerContext.Provider>
  );
}
