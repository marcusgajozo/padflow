import { useEffect, useRef } from "react";
import { Player } from "tone";
import { useEffectStore } from "@/lib/stores/use-effect-store";

interface EffectManagerProviderProps {
  children?: React.ReactNode;
}

export function EffectManagerProvider({
  children,
}: EffectManagerProviderProps) {
  const playerRef = useRef<Player | null>(null);
  const loadedUrlRef = useRef<string | null>(null);

  const activeEffectFile = useEffectStore((state) => state.activeEffectFile);
  const initializePads = useEffectStore((state) => state.initializePads);
  const isInitialized = useEffectStore((state) => state.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
      initializePads();
    }
  }, [isInitialized, initializePads]);

  useEffect(() => {
    console.log("🔊 Inicializando um único player de efeitos...");
    const player = new Player().toDestination();

    playerRef.current = player;

    return () => {
      console.log("🧹 Limpando o player de efeitos.");
      playerRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const manageAudio = async () => {
      const player = playerRef.current;
      if (!player || !activeEffectFile) return;

      const url = URL.createObjectURL(activeEffectFile);

      if (player.loaded && loadedUrlRef.current === url) {
        console.log(`▶️ Tocando som já carregado: ${activeEffectFile.name}`);
        player.start();
        return;
      }

      try {
        console.log(`⏳ Carregando o efeito: ${activeEffectFile.name}...`);

        await player.load(url);

        loadedUrlRef.current = url;
        console.log(`✅ ${activeEffectFile.name} carregado. Tocando...`);

        player.start();
      } catch (error) {
        console.error(
          `❌ Erro ao carregar o efeito ${activeEffectFile.name}:`,
          error
        );
      }
    };

    manageAudio();

    return () => {
      URL.revokeObjectURL(loadedUrlRef.current || "");
    };
  }, [activeEffectFile]);

  return children;
}
