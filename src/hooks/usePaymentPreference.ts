import { useToastContext } from "@/contexts/ToastContext";
import {
  loadPaymentPreferencesService,
  togglePaymentPreferenceService,
} from "@/services/configuracoes/PaymentPreferencesService/payment-preferences-service";
import { PaymentPreference } from "@/services/configuracoes/PaymentPreferencesService/types";
import { getErrorMessage } from "@/utils/get-error-message";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PAYMENT_PREFERENCES_QUERY_KEY = ["Settings-LoadPaymentPreferences"];

export function usePaymentPreference() {
  const { dispatchToast } = useToastContext();
  const queryClient = useQueryClient();

  const loadPaymentPreferences = useQuery({
    queryKey: PAYMENT_PREFERENCES_QUERY_KEY,
    queryFn: loadPaymentPreferencesService.loadAll,
  });

  const togglePaymentPreference = useMutation({
    mutationFn: togglePaymentPreferenceService.toggle,
    onMutate: async ({ paymentMethodId }) => {
      await queryClient.cancelQueries({
        queryKey: PAYMENT_PREFERENCES_QUERY_KEY,
      });

      const previousPreferences = queryClient.getQueryData<PaymentPreference[]>(
        PAYMENT_PREFERENCES_QUERY_KEY
      );

      queryClient.setQueryData<PaymentPreference[]>(
        PAYMENT_PREFERENCES_QUERY_KEY,
        (preferences) =>
          preferences?.map((preference) =>
            preference.paymentMethodId === paymentMethodId
              ? { ...preference, isActive: !preference.isActive }
              : preference
          )
      );

      return { previousPreferences };
    },
    onError: (error, _, context) => {
      queryClient.setQueryData(
        PAYMENT_PREFERENCES_QUERY_KEY,
        context?.previousPreferences
      );
      dispatchToast({
        type: "error",
        message: getErrorMessage(error, "Erro ao atualizar forma de pagamento"),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: PAYMENT_PREFERENCES_QUERY_KEY,
      });
    },
  });

  return { loadPaymentPreferences, togglePaymentPreference };
}
