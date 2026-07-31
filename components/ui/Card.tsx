import { HTMLAttributes } from "react";
import clsx from "clsx";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({
  children,
  className,
  hover = false,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg",
        hover &&
          "transition-all duration-300 hover:border-purple-500 hover:shadow-purple-500/10 hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}