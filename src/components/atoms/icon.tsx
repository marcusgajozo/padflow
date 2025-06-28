import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Icon({
  icon: IconComponent,
  size = "md",
  className,
}: IconProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return <IconComponent className={cn(sizes[size], className)} />;
}
