import { useToastContext } from "@/contexts/ToastContext";
import {
  createBankAccountService,
  deleteBankAccountService,
  loadBankAccountsService,
  updateBankAccountService,
} from "@/services/bank-account-service";
import { getErrorMessage } from "@/utils/get-error-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const BANK_ACCOUNTS_QUERY_KEY = ["Settings-LoadAllBankAccounts"];

export function useBankAccount() {
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const createBankAccount = useMutation({
    mutationFn: createBankAccountService.createBankAccount,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Conta salva",
      });
      queryClient.invalidateQueries({ queryKey: BANK_ACCOUNTS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao cadastrar conta"),
      });
    },
  });

  const deleteBankAccount = useMutation({
    mutationFn: deleteBankAccountService.deleteBankAccount,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Conta excluída",
      });
      queryClient.invalidateQueries({ queryKey: BANK_ACCOUNTS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao excluir conta"),
      });
    },
  });

  const updateBankAccount = useMutation({
    mutationFn: updateBankAccountService.updateBankAccount,
    onSuccess: () => {
      dispatchToast({
        type: "success",
        message: "Conta atualizada",
      });
      queryClient.invalidateQueries({ queryKey: BANK_ACCOUNTS_QUERY_KEY });
    },
    onError: (error) => {
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao atualizar conta"),
      });
    },
  });

  const loadAllBankAccounts = useQuery({
    queryKey: BANK_ACCOUNTS_QUERY_KEY,
    queryFn: loadBankAccountsService.loadAll,
  });

  return {
    createBankAccount,
    deleteBankAccount,
    updateBankAccount,
    loadAllBankAccounts,
  };
}
