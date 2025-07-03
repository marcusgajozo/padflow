import { supabase } from "@/lib/supabase-client";
import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { TYPES_EVENTS_CHANNEL } from "../constants/channel";
import { useEffectStore } from "../stores/use-effect-store";
import { useRemoteControlStore } from "../stores/use-remote-control-store";
import { useToneStore } from "../stores/use-tone-store";

interface RemoteControlProviderProps {
  children?: React.ReactNode;
}

export function RemoteControlProvider({
  children,
}: RemoteControlProviderProps) {
  const roomId = useRemoteControlStore((state) => state.roomId);
  const channelControl = useRemoteControlStore((state) => state.channelControl);
  const isRemoteControl = useRemoteControlStore(
    (state) => state.isRemoteControl
  );

  const setRoomId = useRemoteControlStore((state) => state.setRoomId);
  const setIsRemoteControl = useRemoteControlStore(
    (state) => state.setIsRemoteControl
  );
  const setChannelControl = useRemoteControlStore(
    (state) => state.setChannelControl
  );
  const setEffectPadsRemote = useEffectStore(
    (state) => state.setEffectPadsRemote
  );
  const setActiveTone = useToneStore((state) => state.setActiveTone);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const roomIdFromUrl = searchParams.get("session");
    if (roomIdFromUrl) {
      setRoomId(roomIdFromUrl);
    }
  }, [searchParams, setRoomId]);

  useEffect(() => {
    if (!roomId) return;

    console.log(`Eu sou um controle remoto! Conectando à sala ${roomId}`);
    const channel = supabase.channel(roomId);
    setChannelControl(channel);

    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        console.log(`✅ Controle remoto conectado ao canal: ${roomId}`);
        channel.track({ user: "controller" });
        setIsRemoteControl(true);
      }
    });

    return () => {
      console.log(`🚪 Controle desconectando do canal ${channel.topic}`);
      supabase.removeChannel(channel);
      setChannelControl(null);
    };
  }, [roomId, setChannelControl, setIsRemoteControl]);

  useEffect(() => {
    if (!channelControl || !isRemoteControl) return;

    channelControl
      .on(
        "broadcast",
        { event: TYPES_EVENTS_CHANNEL.HOST_SYNC_STATE },
        ({ payload }) => {
          console.log("Estado recebido do host:", payload);
          if (payload.effectPads) {
            setEffectPadsRemote(payload.effectPads);
          }
        }
      )
      .on(
        "broadcast",
        { event: TYPES_EVENTS_CHANNEL.TONE_ACTIVE },
        ({ payload }) => setActiveTone(payload.key)
      );
  }, [channelControl, isRemoteControl, setActiveTone, setEffectPadsRemote]);

  useEffect(() => {
    if (!channelControl || !isRemoteControl) return;

    channelControl.send({
      type: "broadcast",
      event: TYPES_EVENTS_CHANNEL.CLIENT_REQUEST_STATE,
    });
  }, [channelControl, isRemoteControl, setEffectPadsRemote]);

  return children;
}
