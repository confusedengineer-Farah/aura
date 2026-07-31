import { ReactNode } from "react";
import clsx from "clsx";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  icon,
  action,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between mb-6",
        className
      )}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-1 text-purple-400">
            {icon}
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold text-white">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
}