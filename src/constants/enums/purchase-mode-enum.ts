export enum PurchaseMode {
  AVista = 0,
  Parcelado = 1,
}

export const PurchaseModeLabels: Record<PurchaseMode, string> = {
  [PurchaseMode.AVista]: "À vista",
  [PurchaseMode.Parcelado]: "Parcelado",
};

export const PurchaseModeOptions = Object.entries(PurchaseMode)
  .filter(([key]) => isNaN(Number(key)))
  .map(([, value]) => ({
    value,
    label: PurchaseModeLabels[value as PurchaseMode],
  }));
