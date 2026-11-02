import { useLoaderContext } from "@/contexts/LoaderContext";
import { useToastContext } from "@/contexts/ToastContext";
import { BANK_ACCOUNTS_QUERY_KEY } from "@/hooks/useBankAccount";
import {
  createExpenseService,
  deleteExpenseService,
  ExpenseFilters,
  loadExpensesService,
  updateExpenseService,
} from "@/services/expense-service";
import { getErrorMessage } from "@/utils/get-error-message";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const EXPENSES_QUERY_KEY = ["Expenses-LoadAll"];

export function useExpense() {
  const { dispatchLoader, hideLoader } = useLoaderContext();
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const handleSuccess = (message: string) => {
    hideLoader();
    dispatchToast({ type: "success", message });
    queryClient.invalidateQueries({ queryKey: EXPENSES_QUERY_KEY });
    queryClient.invalidateQueries({ queryKey: BANK_ACCOUNTS_QUERY_KEY });
  };

  const handleError = (error: Error, fallback: string) => {
    hideLoader();
    dispatchToast({
      type: "error",
      message: getErrorMessage(error, fallback),
    });
  };

  const createExpense = useMutation({
    mutationFn: createExpenseService.createExpense,
    onMutate: () => dispatchLoader(),
    onSuccess: () => handleSuccess("Gasto salvo"),
    onError: (error) => handleError(error, "Erro ao cadastrar gasto"),
  });

  const updateExpense = useMutation({
    mutationFn: updateExpenseService.updateExpense,
    onMutate: () => dispatchLoader(),
    onSuccess: () => handleSuccess("Gasto atualizado"),
    onError: (error) => handleError(error, "Erro ao atualizar gasto"),
  });

  const deleteExpense = useMutation({
    mutationFn: deleteExpenseService.deleteExpense,
    onMutate: () => dispatchLoader(),
    onSuccess: () => handleSuccess("Gasto excluído"),
    onError: (error) => handleError(error, "Erro ao excluir gasto"),
  });

  return { createExpense, updateExpense, deleteExpense };
}

export function useExpensesList(filters: ExpenseFilters = {}) {
  return useQuery({
    queryKey: [...EXPENSES_QUERY_KEY, filters],
    queryFn: () => loadExpensesService.loadAll(filters),
    placeholderData: keepPreviousData,
  });
}
