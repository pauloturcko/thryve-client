"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { GooeyNav } from "@/components/Molecules/GooeyNav";

export type SettingsMenuItem = {
  name: string;
  route: string;
  icon: ReactNode;
};

export type SettingsMenuProps = {
  items: SettingsMenuItem[];
};

export const SettingsMenu = ({ items }: SettingsMenuProps) => {
  const pathname = usePathname();
  const activeIndex = items.findIndex(
    (item) => pathname === item.route || pathname.startsWith(`${item.route}/`)
  );

  return (
    <GooeyNav
      ariaLabel="Configurações"
      activeIndex={Math.max(0, activeIndex)}
      items={items.map((item) => ({
        label: item.name,
        href: item.route,
        icon: item.icon,
      }))}
    />
  );
};
