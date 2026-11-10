import { http } from "@/http/http";

type CreateCardParams = {
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

type LoadAllCardsResponse = {
  cards: Card[];
};

export const createCardService = {
  createCard: ({
    name,
    cardType,
    cardFlag,
    expiresIn,
    limit,
    lastFourDigits,
  }: CreateCardParams) =>
    http.post("/cards/register", {
      name,
      cardType,
      cardFlag,
      expiresIn,
      limit,
      lastFourDigits,
    }),
};

export const loadCardsService = {
  loadAll: async (): Promise<Card[]> => {
    const response = await http.get<LoadAllCardsResponse>("/cards/user-cards");
    return response.data.cards;
  },
};

export const deleteCardService = {
  deleteCard: ({ id }: { id: number }) =>
    http.delete("/cards/delete", { data: { id } }),
};

export type UpdateCardParams = Partial<CreateCardParams> & {
  id: number;
};

export const updateCardService = {
  updateCard: ({ id, ...fields }: UpdateCardParams) =>
    http.patch("/cards/update", { id, ...fields }),
};
