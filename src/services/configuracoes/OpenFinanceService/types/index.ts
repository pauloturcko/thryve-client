// Conexão Open Finance salva na API depois do onSuccess do Pluggy Connect.
export type OpenFinanceItem = {
  id: number;
  userId: number;
  itemId: string;
  connectorName: string;
  connectorImageUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};
