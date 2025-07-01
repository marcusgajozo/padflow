import type { RealtimeChannel } from "@supabase/supabase-js";
import { createContext } from "react";

interface RemoteControlManagerContextType {
  channelRef: React.RefObject<RealtimeChannel | null>;
  toggleRemoteActiveControl: () => void;
  isRemoteControl: boolean;
  quatityControllers: number;
}

export const RemoteControlManagerContext =
  createContext<RemoteControlManagerContextType | null>(null);
