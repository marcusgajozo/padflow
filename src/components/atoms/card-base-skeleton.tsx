import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

export function CardBaseSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const baseStyles =
    "rounded-2xl transition-all duration-200 cursor-pointer select-none min-h-[120px] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 shadow-lg hover:shadow-xl active:scale-95";

  return <Skeleton className={cn(baseStyles, className)} {...props} />;
}
