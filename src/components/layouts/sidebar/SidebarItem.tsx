"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { Icon } from "@/components/ui/Icon";
import { iconPaths } from "@root/public/icons/iconPaths";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  label: string;
  href: string;
}

const SidebarItem = ({ href, label }: SidebarItemProps) => {
  const pathname = usePathname();
  console.log(pathname.includes(href), pathname, href.substring(1));
  const iconMatch = useMemo(() => {
    const iconKeys = Object.keys(iconPaths);
    if (pathname.includes(href)) {
      return iconKeys.filter((k) => k.includes(href.substring(1)) && k.includes("active"))[0];
    } else {
      return iconKeys.filter((k) => k.includes(href.substring(1)) && k.includes("base"))[0];
    }
  }, [href, pathname]);
  return (
    <Button
      variant={pathname.includes(href) ? "ctm-primary" : "ctm-outline"}
      slotBefore={<Icon text-id="sidebar-icon" name={iconMatch as keyof typeof iconPaths} />}
      className={cn(
        "border-none shadow-none text-[#484D57] hover:text-white text-left w-[12rem] justify-start text-[16px] font-[400]",
        {
          "bg-ctm-primary-colour-light": !pathname.includes(href),
          "text-white": pathname.includes(href),
        }
      )}
      asChild
    >
      <Link className="text-left" href={href}>
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
