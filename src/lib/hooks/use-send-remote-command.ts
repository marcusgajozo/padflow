import { supabase } from "@/lib/supabase-client";
import { useEffect, useRef } from "react";
import { useRemoteStore } from "../stores/use-remote-store";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { padsContinuos } from "../constants/pads";

type PadKey = keyof typeof padsContinuos;

/**
 * Hook to send commands to the remote control channel.
 * This hook sets up a Supabase channel for remote control actions
 * and provides a function to send actions to the channel.
 */
export function useSendRemoteCommands() {
  const isRemoteControl = useRemoteStore((state) => state.isRemoteControl);
  const roomId = useRemoteStore((state) => state.roomId);

  const channelRef = useRef<RealtimeChannel | null>(null);
  useEffect(() => {
    if (!isRemoteControl || !roomId) return;

    const channel = supabase.channel(roomId);
    channelRef.current = channel;

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.track({ user: "controller" });
        console.log(`📲 Controle conectado ao canal: ${roomId}`);
      }
    });

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [isRemoteControl, roomId]);

  const sendAction = (key: PadKey) => {
    if (channelRef.current) {
      channelRef.current.send({
        type: "broadcast",
        event: "control_action",
        payload: { action: "SET_ACTIVE_TONE", key },
      });
    }
  };

  return { sendAction };
}
