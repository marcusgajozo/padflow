import { RemoteControlManagerContext } from "@/lib/context/remote-control-manager-context";
import { useEffectManager } from "@/lib/hooks/use-effect-manager";
import { useToneStore } from "@/lib/stores/use-tone-store";
import { supabase } from "@/lib/supabase-client";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

interface RemoteControlManagerProviderProps {
  children?: React.ReactNode;
}

export function RemoteControlManagerProvider({
  children,
}: RemoteControlManagerProviderProps) {
  const [isRemoteActive, setIsRemoteActive] = useState(false);
  const [isRemoteControl, setIsRemoteControl] = useState(false);
  const [quatityControllers, setQuantityControllers] = useState(0);

  const [searchParams] = useSearchParams();
  const roomIdParams = searchParams.get("session");

  const channelRef = useRef<RealtimeChannel | null>(null);

  const setActiveTone = useToneStore((state) => state.setActiveTone);
  const { play: playEffect } = useEffectManager();

  useEffect(() => {
    if (!isRemoteActive) return;

    const roomId = `padflow-${Math.random().toString(36).slice(2, 8)}`;

    const channel = supabase.channel(roomId);
    channelRef.current = channel;

    channel
      .on("broadcast", { event: "control_action" }, ({ payload }) => {
        console.log("Recebida ação do controle:", payload);

        if (payload.action === "SET_ACTIVE_TONE") {
          setActiveTone(payload.key);
        }

        if (payload.action === "PLAY_EFFECT") {
          playEffect(payload.effectId);
        }
      })
      .on("presence", { event: "join" }, () => {
        console.log("🎮 Controle conectado!");
        setQuantityControllers((prev) => prev + 1);
      })
      .on("presence", { event: "leave" }, () => {
        console.log("🔌 Controle desconectado.");
        setQuantityControllers((prev) => prev - 1);
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
  }, [isRemoteActive, playEffect, setActiveTone]);

  useEffect(() => {
    if (!roomIdParams) return;

    const channel = supabase.channel(roomIdParams);
    channelRef.current = channel;

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.track({ user: "controller" });
        console.log(`📲 Controle conectado ao canal: ${roomIdParams}`);
      }
    });

    setIsRemoteControl(true);

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [roomIdParams]);

  const toggleRemoteActiveControl = () => {
    if (isRemoteControl) return;
    setIsRemoteActive((prev) => !prev);
  };

  return (
    <RemoteControlManagerContext.Provider
      value={{
        channelRef,
        toggleRemoteActiveControl,
        isRemoteControl,
        quatityControllers,
      }}
    >
      {children}
    </RemoteControlManagerContext.Provider>
  );
}
