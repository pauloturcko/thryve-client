import { SettingsMenuItem } from "@/components/Molecules/SettingsMenu";
import { CreditCard, DollarSign, User, Target, Wallet, Tags } from "lucide-react";

export const settingsMenuItems: SettingsMenuItem[] = [
  {
    name: "Categorias",
    route: "/configuracoes/categorias",
    icon: <Tags />,
  },
  {
    name: "Contas",
    route: "/configuracoes/contas",
    icon: <Wallet />,
  },
  {
    name: "Cartões",
    route: "/configuracoes/cartoes",
    icon: <CreditCard />,
  },
  {
    name: "Metas",
    route: "/configuracoes/metas",
    icon: <Target />,
  },
  {
    name: "Formas de Pagamento",
    route: "/configuracoes/formas-de-pagamento",
    icon: <DollarSign />,
  },
  {
    name: "Perfil",
    route: "/configuracoes/perfil",
    icon: <User />,
  },
];
