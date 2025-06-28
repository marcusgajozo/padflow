import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-xl transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
    secondary:
      "bg-slate-700 hover:bg-slate-600 text-white shadow-md hover:shadow-lg focus:ring-slate-500",
    ghost:
      "bg-transparent hover:bg-slate-700/50 text-slate-300 hover:text-white focus:ring-slate-500",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm min-h-[40px]",
    md: "px-4 py-3 text-base min-h-[48px]",
    lg: "px-6 py-4 text-lg min-h-[56px]",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
