import { Outlet } from "react-router";
import { MainHeader } from "@/components/organisms/main-header";
import { useToneStore } from "@/lib/stores/use-tone-store";
import { useToneManager } from "@/lib/hooks/use-tone-manager";
import { RemoteControlManagerProvider } from "@/lib/providers/remote-control-manager-provider";

export function PageLayout() {
  const activeTone = useToneStore((state) => state.activeTone);

  useToneManager({
    activeTone,
  });

  return (
    <RemoteControlManagerProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <MainHeader />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </RemoteControlManagerProvider>
  );
}
