import { iconPaths } from "@root/public/icons/iconPaths";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IconName = keyof typeof iconPaths;

interface IconProps {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export const Icon = ({
  name,
  width = 24,
  height = 24,
  className,
  alt = `${name} icon`,
}: IconProps) => {
  const path = iconPaths[name];

  if (!path) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <Image
      src={path}
      width={width}
      height={height}
      alt={alt}
      className={cn("inline-block", className)}
    />
  );
};
