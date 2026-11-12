"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ChartLineData02Icon,
  DashboardSquare02Icon,
  Logout03Icon,
  MoneyReceiveSquareIcon,
  MoneySendSquareIcon,
  MoneyBag02Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { usePathname } from "next/navigation";
import { Dock, DockEntry } from "@/components/Organisms/Dock";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardSquare02Icon },
  { label: "Rendas", href: "/rendas", icon: MoneyReceiveSquareIcon },
  { label: "Gastos", href: "/gastos", icon: MoneySendSquareIcon },
  { label: "Investimentos", href: "/investimentos", icon: MoneyBag02Icon },
  { label: "Relatórios", href: "/relatorios", icon: ChartLineData02Icon },
  { label: "Configurações", href: "/configuracoes", icon: Settings02Icon },
];

const icon = (svg: typeof Settings02Icon) => (
  <HugeiconsIcon
    icon={svg}
    strokeWidth={1.7}
  />
);

export const AppDock = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const items: DockEntry[] = [
    ...navItems.map(
      (item): DockEntry => ({
        kind: "link",
        label: item.label,
        href: item.href,
        icon: icon(item.icon),
        active: pathname === item.href || pathname.startsWith(`${item.href}/`),
      })
    ),
    { kind: "separator" },
    {
      kind: "action",
      label: "Sair",
      icon: icon(Logout03Icon),
      onClick: logout,
      tone: "danger",
    },
  ];

  return <Dock items={items} />;
};
