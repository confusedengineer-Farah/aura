import Image from "next/image";
import clsx from "clsx";

interface AvatarProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-10 w-10 text-sm",
  md: "h-14 w-14 text-lg",
  lg: "h-20 w-20 text-2xl",
};

export default function Avatar({
  src,
  name,
  size = "md",
  className,
}: AvatarProps) {
  const initial = name?.charAt(0).toUpperCase() || "?";

  if (src) {
    return (
      <Image
        src={src}
        alt={name || "Avatar"}
        width={80}
        height={80}
        className={clsx(
          "rounded-full object-cover border-2 border-purple-500",
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full bg-purple-600 font-bold text-white border-2 border-purple-500",
        sizes[size],
        className
      )}
    >
      {initial}
    </div>
  );
}