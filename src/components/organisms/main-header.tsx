import { NavigationToggle } from "@/components/molecules/navigation-toggle";
import { useParams } from "react-router";

export function MainHeader() {
  const params = useParams();

  console.log("Params:", params);

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            PadFlow
          </h1>
          <NavigationToggle activeMode={"tones"} />
        </div>
      </div>
    </header>
  );
}
