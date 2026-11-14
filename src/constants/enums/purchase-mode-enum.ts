import { enumToOptions } from "@/utils/enum-options";

export enum PurchaseMode {
  AVista = 0,
  Parcelado = 1,
}

export const PurchaseModeLabels: Record<PurchaseMode, string> = {
  [PurchaseMode.AVista]: "À vista",
  [PurchaseMode.Parcelado]: "Parcelado",
};

export const PurchaseModeOptions = enumToOptions(
  PurchaseMode,
  PurchaseModeLabels
);
