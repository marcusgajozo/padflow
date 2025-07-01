import { MainHeader } from "@/components/organisms/main-header";
import { EffectManagerProvider } from "@/lib/providers/effect-manager-provider";
import { RemoteControlManagerProvider } from "@/lib/providers/remote-control-manager-provider";
import { ToneManagerProvider } from "@/lib/providers/tone-manager-provider";
import { Outlet } from "react-router";

export function PageLayout() {
  return (
    <ToneManagerProvider>
      <EffectManagerProvider>
        <RemoteControlManagerProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <MainHeader />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
              <Outlet />
            </main>
          </div>
        </RemoteControlManagerProvider>
      </EffectManagerProvider>
    </ToneManagerProvider>
  );
}
