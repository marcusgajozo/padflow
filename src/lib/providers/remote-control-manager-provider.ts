import { useEffectStore } from "@/lib/stores/use-effect-store";
import { useRemoteStore } from "@/lib/stores/use-remote-store";
import { useToneStore } from "@/lib/stores/use-tone-store";
import { supabase } from "@/lib/supabase-client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";

interface RemoteControlManagerProviderProps {
  children?: React.ReactNode;
}

export function RemoteControlManagerProvider({
  children,
}: RemoteControlManagerProviderProps) {
  const isRemoteActive = useRemoteStore((state) => state.isRemoteActive);
  const setRoomId = useRemoteStore((state) => state.setRoomId);
  const effectPads = useEffectStore((state) => state.effectPads);

  const setIsRemoteControl = useRemoteStore(
    (state) => state.setIsRemoteControl
  );
  const incrementControllers = useRemoteStore(
    (state) => state.incrementControllers
  );
  const decrementControllers = useRemoteStore(
    (state) => state.decrementControllers
  );

  const [searchParams] = useSearchParams();
  const roomIdParams = searchParams.get("session");

  const channelRef = useRef<RealtimeChannel | null>(null);

  const setActiveTone = useToneStore((state) => state.setActiveTone);
  const setActiveEffect = useEffectStore((state) => state.setActiveEffect);

  useEffect(() => {
    if (!isRemoteActive) return;

    const roomId = `padflow-${Math.random().toString(36).slice(2, 8)}`;
    setRoomId(roomId);

    const channel = supabase.channel(roomId);
    channelRef.current = channel;

    channel
      .on("broadcast", { event: "control_action" }, ({ payload }) => {
        console.log("Recebida ação do controle:", payload);

        if (payload.action === "SET_ACTIVE_TONE") {
          setActiveTone(payload.key);
        }

        if (payload.action === "PLAY_EFFECT") {
          setActiveEffect(payload.effectId);
        }
      })
      .on("presence", { event: "join" }, () => {
        console.log("🎮 Controle conectado!");
        incrementControllers();
      })
      .on("presence", { event: "leave" }, () => {
        console.log("🔌 Controle desconectado.");
        decrementControllers();
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channel.track({ user: "host" });
          console.log(`✅ Host a ouvir no canal: ${roomId}`);
        }
      });

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
        console.log(`🚪 Canal ${roomId} fechado.`);
      }
    };
  }, [
    decrementControllers,
    effectPads,
    incrementControllers,
    isRemoteActive,
    setActiveEffect,
    setActiveTone,
    setRoomId,
  ]);

  useEffect(() => {
    if (!roomIdParams) return;

    setIsRemoteControl(true);
    setRoomId(roomIdParams);
  }, [roomIdParams, setIsRemoteControl, setRoomId]);

  return children;
}
