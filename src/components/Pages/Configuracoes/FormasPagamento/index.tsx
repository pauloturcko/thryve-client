"use client";

import { SettingsPanel } from "@/components/Molecules/SettingsPanel";
import { ToggleItem } from "@/components/Molecules/ToggleItem";
import { usePaymentPreference } from "@/hooks/usePaymentPreference";
import * as S from "./styles";

export const FormasPagamentoPage = () => {
  const { loadPaymentPreferences, togglePaymentPreference } =
    usePaymentPreference();

  return (
    <SettingsPanel
      title="Formas de Pagamento"
      description="Escolha quais formas de pagamento aparecem nos seus lançamentos"
    >
      <S.PreferencesList>
        {loadPaymentPreferences.isLoading && (
          <S.Message>Carregando...</S.Message>
        )}
        {loadPaymentPreferences.data?.length === 0 && (
          <S.Message>Nenhuma forma de pagamento encontrada.</S.Message>
        )}
        {loadPaymentPreferences.data?.map((preference) => (
          <ToggleItem
            key={preference.id}
            title={preference.paymentMethod.name}
            description={
              preference.isActive ? "Disponível no cadastro" : "Oculto"
            }
            checked={preference.isActive}
            onChange={() =>
              togglePaymentPreference.mutate({
                paymentMethodId: preference.paymentMethodId,
              })
            }
          />
        ))}
      </S.PreferencesList>
    </SettingsPanel>
  );
};
