import { redirect } from "next/navigation";
import { settingsMenuItems } from "@/constants/settingsMenuItems";

export default function ConfiguracoesPage() {
  redirect(settingsMenuItems[0].route);
}
