import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastContext } from "@/contexts/ToastContext";
import { openFinanceService } from "@/services/configuracoes/OpenFinanceService/open-finance-service";
import { getErrorMessage } from "@/utils/get-error-message";

export const OPEN_FINANCE_ITEMS_QUERY_KEY = ["OpenFinance-LoadItems"];

export function useOpenFinance() {
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const createConnectToken = useMutation({
    mutationFn: openFinanceService.createConnectToken,
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(
          error,
          "Erro ao iniciar a conexão com o banco"
        ),
      });
    },
  });

  const registerItem = useMutation({
    mutationFn: openFinanceService.registerItem,
    onSuccess: (item) => {
      dispatchToast({
        type: "success",
        message: `${item.connectorName} conectado`,
      });
      queryClient.invalidateQueries({ queryKey: OPEN_FINANCE_ITEMS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao salvar a conexão com o banco"),
      });
    },
  });

  return { createConnectToken, registerItem };
}

export function useOpenFinanceItems() {
  return useQuery({
    queryKey: OPEN_FINANCE_ITEMS_QUERY_KEY,
    queryFn: openFinanceService.loadAll,
  });
}
