import { padsContinuos } from "@/lib/constants/pads";
import { useEffect, useRef, useState } from "react";
import { Player } from "tone";

type PadKey = keyof typeof padsContinuos;

interface ToneManagerProps {
  activeTone?: PadKey;
}

export function useToneManager({ activeTone }: ToneManagerProps) {
  const playerRef = useRef<Player | null>(null);
  const loadedUrlRef = useRef<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);

        await player.load(audioUrl);

        loadedUrlRef.current = audioUrl;
        console.log(`✅ ${activeTone} carregado. Tocando...`);

        player.start();
      } catch (error) {
        console.error(`❌ Erro ao carregar o tom ${activeTone}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    manageAudio();
  }, [activeTone]);

  return { isLoading };
}
