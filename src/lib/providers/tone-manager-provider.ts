import { padsContinuos } from "@/lib/constants/pads";
import { useEffect, useRef } from "react";
import { Player } from "tone";
import { useToneStore } from "../stores/use-tone-store";

interface ToneManagerProviderProps {
  children?: React.ReactNode;
}

export function ToneManagerProvider({ children }: ToneManagerProviderProps) {
  const activeTone = useToneStore((state) => state.activeTone);
  const playerRef = useRef<Player | null>(null);
  const loadedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    console.log("🔊 Inicializando um único Tone.Player...");
    const player = new Player({
      loop: true,
      fadeIn: 0.5,
      fadeOut: 0.9,
    }).toDestination();

    playerRef.current = player;

    return () => {
      console.log("🧹 Limpando o player.");
      playerRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const manageAudio = async () => {
      const player = playerRef.current;
      if (!player) return;

      if (player.state === "started") {
        player.stop();
      }

      if (!activeTone) {
        return;
      }

      const audioUrl = padsContinuos[activeTone];

      if (player.loaded && loadedUrlRef.current === audioUrl) {
        console.log(`▶️ Tocando som já carregado: ${activeTone}`);
        player.start();
        return;
      }

      try {
        console.log(`⏳ Carregando o tom: ${activeTone}...`);

        await player.load(audioUrl);

        loadedUrlRef.current = audioUrl;
        console.log(`✅ ${activeTone} carregado. Tocando...`);

        player.start();
      } catch (error) {
        console.error(`❌ Erro ao carregar o tom ${activeTone}:`, error);
      }
    };

    manageAudio();
  }, [activeTone]);

  return children;
}
