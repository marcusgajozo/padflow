import { useCallback, useEffect, useRef, useState } from "react";
import { Player } from "tone";

export const useEffectPlayer = (audioFile?: File) => {
  const playerRef = useRef<Player | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!audioFile) return;

    setIsLoaded(false);
    const url = URL.createObjectURL(audioFile);
    const player = new Player({
      url,
      onload: () => setIsLoaded(true),
    }).toDestination();

    playerRef.current = player;

    return () => {
      player.dispose();
      URL.revokeObjectURL(url);
    };
  }, [audioFile]);

  const play = useCallback(() => {
    const player = playerRef.current;
    if (!player || !isLoaded) return;

    player.start();
  }, [isLoaded]);

  return { play, isLoaded };
};
