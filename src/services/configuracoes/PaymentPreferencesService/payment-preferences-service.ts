import { http } from "@/http/http";
import { PaymentPreference } from "./types";

export const loadPaymentPreferencesService = {
  loadAll: async (): Promise<PaymentPreference[]> => {
    const response = await http.get<PaymentPreference[]>(
      "/payment-method/list"
    );
    return response.data;
  },
};

export const togglePaymentPreferenceService = {
  toggle: ({ paymentMethodId }: { paymentMethodId: number }) =>
    http.patch(`/payment-method/${paymentMethodId}/update-preferences`),
};
