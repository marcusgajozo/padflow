import { useContext } from "react";
import { RemoteControlManagerContext } from "@/lib/context/remote-control-manager-context";

export const useRemoteControlManager = () => {
  const context = useContext(RemoteControlManagerContext);
  if (!context) {
    throw new Error(
      "useRemoteControlManager deve ser usado dentro de um RemoteControlManagerProvider"
    );
  }
  return context;
};
