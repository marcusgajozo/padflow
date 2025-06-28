import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TitleProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

export default function Title({ children, level = 1, className }: TitleProps) {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  const styles = {
    1: "text-3xl md:text-4xl font-bold",
    2: "text-2xl md:text-3xl font-bold",
    3: "text-xl md:text-2xl font-semibold",
    4: "text-lg md:text-xl font-semibold",
  };

  return (
    <Component className={cn(styles[level], "text-white", className)}>
      {children}
    </Component>
  );
}
