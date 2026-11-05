export enum CardType {
  Credito = 1,
  Debito = 2,
  DebitoCredito = 3,
}

export const CardTypeLabels: Record<CardType, string> = {
  [CardType.Debito]: "Débito",
  [CardType.Credito]: "Crédito",
  [CardType.DebitoCredito]: "Débito e Crédito",
};

export const CardTypeOptions = Object.entries(CardType)
  .filter(([key]) => isNaN(Number(key)))
  .map(([, value]) => ({
    value,
    label: CardTypeLabels[value as CardType],
  }));
