import { NavigationToggle } from "@/components/molecules/navigation-toggle";
import { useRemoteHostStore } from "@/lib/stores/use-remote-host-store";
import { useLocation } from "react-router";
import { Button } from "../atoms/button";
import { useRemoteControlStore } from "@/lib/stores/use-remote-control-store";

export function MainHeader() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isRemoteHost = useRemoteHostStore((state) => state.isRemoteHost);
  const toggleStatusRemoteHost = useRemoteHostStore(
    (state) => state.toggleStatusRemoteHost
  );
  const isRemoteControl = useRemoteControlStore(
    (state) => state.isRemoteControl
  );

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            PadFlow
          </h1>
          {!isRemoteControl && (
            <div>
              <Button
                variant={isRemoteHost ? "danger" : "secondary"}
                onClick={toggleStatusRemoteHost}
              >
                {isRemoteHost ? "Disable" : "Activate "} remote control
              </Button>
            </div>
          )}
          <NavigationToggle urlMode={currentPath} />
        </div>
      </div>
    </header>
  );
}
