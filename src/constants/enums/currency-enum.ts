export enum Currency {
  Real = 0,
  DolarAmericano = 1,
  DolarAustraliano = 2,
  DolarNeozelandes = 3,
  Euro = 4,
  Libra = 5,
}

export const CurrencyLabels: Record<Currency, string> = {
  [Currency.Real]: "Real (R$)",
  [Currency.DolarAmericano]: "Dólar americano (US$)",
  [Currency.DolarAustraliano]: "Dólar australiano (A$)",
  [Currency.DolarNeozelandes]: "Dólar neozelandês (NZ$)",
  [Currency.Euro]: "Euro (€)",
  [Currency.Libra]: "Libra esterlina (£)",
};

// Símbolos fixos, sem depender do idioma: o Intl mostra só "$" para o dólar em inglês e
// "1234,50 BRL" em espanhol, o que deixaria a moeda ambígua.
export const CurrencySymbols: Record<Currency, string> = {
  [Currency.Real]: "R$",
  [Currency.DolarAmericano]: "US$",
  [Currency.DolarAustraliano]: "A$",
  [Currency.DolarNeozelandes]: "NZ$",
  [Currency.Euro]: "€",
  [Currency.Libra]: "£",
};
