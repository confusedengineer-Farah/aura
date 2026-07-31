import clsx from "clsx";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "success" | "warning" | "danger" | "gray";
}

export default function Badge({
  children,
  className,
  variant = "primary",
  ...props
}: BadgeProps) {
  const variants = {
    primary:
      "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    success:
      "bg-green-500/20 text-green-400 border border-green-500/30",
    warning:
      "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    danger:
      "bg-red-500/20 text-red-400 border border-red-500/30",
    gray:
      "bg-slate-700/40 text-slate-300 border border-slate-600",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}