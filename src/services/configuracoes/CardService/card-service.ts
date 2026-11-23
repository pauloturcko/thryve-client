import { http } from "@/http/http";
import {
  CreateCardParams,
  Card,
  LoadAllCardsResponse,
  UpdateCardParams,
} from "./types";

export const createCardService = {
  createCard: ({
    name,
    cardType,
    cardFlag,
    expiresIn,
    limit,
    lastFourDigits,
    bankAccountId,
  }: CreateCardParams) =>
    http.post("/cards/register", {
      name,
      cardType,
      cardFlag,
      expiresIn,
      limit,
      lastFourDigits,
      bankAccountId,
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

export const updateCardService = {
  updateCard: ({ id, ...fields }: UpdateCardParams) =>
    http.patch("/cards/update", { id, ...fields }),
};
