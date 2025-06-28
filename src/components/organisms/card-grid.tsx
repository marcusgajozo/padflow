import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardGridProps {
  children: ReactNode;
  className?: string;
}

export function CardGrid({ children, className }: CardGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}
