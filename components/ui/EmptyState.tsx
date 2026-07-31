import { ReactNode } from "react";
import clsx from "clsx";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center",
        className
      )}
    >
      {icon && (
        <div className="mb-5 text-purple-400">
          {icon}
        </div>
      )}

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-slate-400">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}