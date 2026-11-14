export type CreateCardParams = {
  name: string;
  cardType: number;
  cardFlag: number;
  expiresIn: string;
  limit: number | null;
  lastFourDigits: string;
};

export type Card = {
  id: number;
  userId: number;
  name: string;
  limit: string | null;
  cardType: number;
  cardFlag: number;
  expiresIn: string;
  lastFourDigits: string;
};

export type LoadAllCardsResponse = {
  cards: Card[];
};

export type UpdateCardParams = Partial<CreateCardParams> & {
  id: number;
};
