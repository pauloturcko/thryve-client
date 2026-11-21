import { http } from "@/http/http";
import { OpenFinanceItem } from "./types";

export const openFinanceService = {
  createConnectToken: async (itemId?: string): Promise<string> => {
    const response = await http.post<{ accessToken: string }>(
      "/open-finance/connect-token",
      itemId ? { itemId } : {}
    );
    return response.data.accessToken;
  },

  registerItem: async (itemId: string): Promise<OpenFinanceItem> => {
    const response = await http.post<{ item: OpenFinanceItem }>(
      "/open-finance/items/register",
      { itemId }
    );
    return response.data.item;
  },

  loadAll: async (): Promise<OpenFinanceItem[]> => {
    const response = await http.get<{ items: OpenFinanceItem[] }>(
      "/open-finance/items/user-items"
    );
    return response.data.items;
  },
};
