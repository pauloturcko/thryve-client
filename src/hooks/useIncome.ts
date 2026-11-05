import { useLoaderContext } from "@/contexts/LoaderContext";
import { useToastContext } from "@/contexts/ToastContext";
import { BANK_ACCOUNTS_QUERY_KEY } from "@/hooks/useBankAccount";
import {
  createIncomeService,
  deleteIncomeService,
  IncomeFilters,
  loadIncomesService,
  updateIncomeService,
} from "@/services/income-service";
import { getErrorMessage } from "@/utils/get-error-message";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const INCOMES_QUERY_KEY = ["Incomes-LoadAll"];

export function useIncome() {
  const { dispatchLoader, hideLoader } = useLoaderContext();
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const handleSuccess = (message: string) => {
    hideLoader();
    dispatchToast({ type: "success", message });
    queryClient.invalidateQueries({ queryKey: INCOMES_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: BANK_ACCOUNTS_QUERY_KEY });
  };

  const handleError = (error: Error, fallback: string) => {
    hideLoader();
    dispatchToast({
      type: "error",
      message: getErrorMessage(error, fallback),
    });
  };

  const createIncome = useMutation({
    mutationFn: createIncomeService.createIncome,
    onMutate: () => dispatchLoader(),
    onSuccess: () => handleSuccess("Receita salva"),
    onError: (error) => handleError(error, "Erro ao cadastrar receita"),
  });

  const updateIncome = useMutation({
    mutationFn: updateIncomeService.updateIncome,
    onMutate: () => dispatchLoader(),
    onSuccess: () => handleSuccess("Receita atualizada"),
    onError: (error) => handleError(error, "Erro ao atualizar receita"),
  });

  const deleteIncome = useMutation({
    mutationFn: deleteIncomeService.deleteIncome,
    onMutate: () => dispatchLoader(),
    onSuccess: () => handleSuccess("Receita excluída"),
    onError: (error) => handleError(error, "Erro ao excluir receita"),
  });

  return { createIncome, updateIncome, deleteIncome };
}

export function useIncomesList(filters: IncomeFilters = {}) {
  return useQuery({
    queryKey: [...INCOMES_QUERY_KEY, filters],
    queryFn: () => loadIncomesService.loadAll(filters),
    placeholderData: keepPreviousData,
  });
}
