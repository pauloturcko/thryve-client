import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToastContext } from "@/contexts/ToastContext";
import { BANK_ACCOUNTS_QUERY_KEY } from "@/hooks/useBankAccount";
import {
  investmentMovementService,
  investmentService,
} from "@/services/investimentos/InvestmentService/investment-service";
import {
  InvestmentFilters,
  InvestmentMovementFilters,
} from "@/services/investimentos/InvestmentService/types";
import { getErrorMessage } from "@/utils/get-error-message";

export const INVESTMENTS_QUERY_KEY = ["Investments-LoadAll"];
export const INVESTMENT_MOVEMENTS_QUERY_KEY = ["Investments-LoadMovements"];

export function useInvestment() {
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: INVESTMENTS_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: INVESTMENT_MOVEMENTS_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: BANK_ACCOUNTS_QUERY_KEY });
  };

  const withFeedback = <TParams>(
    mutationFn: (params: TParams) => Promise<unknown>,
    success: string,
    failure: string
  ) => ({
    mutationFn,
    onSuccess: () => {
      dispatchToast({ type: "success", message: success });
      refresh();
    },
    onError: (error: unknown) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, failure),
      });
    },
  });

  const createInvestment = useMutation(
    withFeedback(
      investmentService.create,
      "Investimento salvo",
      "Erro ao cadastrar investimento"
    )
  );
  const updateInvestment = useMutation(
    withFeedback(
      investmentService.update,
      "Investimento atualizado",
      "Erro ao atualizar investimento"
    )
  );
  const deleteInvestment = useMutation(
    withFeedback(
      investmentService.delete,
      "Investimento excluído",
      "Erro ao excluir investimento"
    )
  );
  const updateValue = useMutation(
    withFeedback(
      investmentService.updateValue,
      "Valor atualizado",
      "Erro ao atualizar o valor"
    )
  );
  const createMovement = useMutation(
    withFeedback(
      investmentMovementService.create,
      "Movimentação registrada",
      "Erro ao registrar movimentação"
    )
  );
  const updateMovement = useMutation(
    withFeedback(
      investmentMovementService.update,
      "Movimentação atualizada",
      "Erro ao atualizar movimentação"
    )
  );
  const deleteMovement = useMutation(
    withFeedback(
      investmentMovementService.delete,
      "Movimentação excluída",
      "Erro ao excluir movimentação"
    )
  );

  return {
    createInvestment,
    updateInvestment,
    deleteInvestment,
    updateValue,
    createMovement,
    updateMovement,
    deleteMovement,
  };
}

export function useInvestmentsList(filters: InvestmentFilters = {}) {
  return useQuery({
    queryKey: [...INVESTMENTS_QUERY_KEY, filters],
    queryFn: () => investmentService.loadAll(filters),
  });
}

export function useInvestmentMovements(
  filters: InvestmentMovementFilters,
  enabled = true
) {
  return useQuery({
    queryKey: [...INVESTMENT_MOVEMENTS_QUERY_KEY, filters],
    queryFn: () => investmentMovementService.loadAll(filters),
    enabled,
  });
}
