import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/Atoms/FormInput";
import { FormWrapper } from "@/components/Atoms/FormWrapper";
import { CardFlag, CardFlagOptions } from "@/constants/enums/card-flag-enum";
import { CardType, CardTypeOptions } from "@/constants/enums/card-type-enum";
import { useCard } from "@/hooks/useCard";
import { Card } from "@/services/card-service";
import { formatCurrencyInput, formatExpiryDate } from "@/utils/format";
import { maskCurrency, maskDigitsOnly, maskExpiryDate } from "@/utils/masks";
import { ChangeEvent } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import * as S from "./styles";
import { useInvalidFormToast } from "@/hooks/useInvalidFormToast";

type NewCardFormData = {
  nome: string;
  ultimosDigitos: string;
  bandeira: number;
  tipo: number;
  validade: string;
  limite: string;
};

const requiredMessage = "Campo obrigatório";

export const NewCard = ({
  onClose,
  card,
}: {
  onClose: () => void;
  card?: Card;
}) => {
  const { createCard, updateCard } = useCard();
  const isEditMode = !!card;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCardFormData>({
    defaultValues: card
      ? {
          nome: card.name,
          ultimosDigitos: card.lastFourDigits,
          bandeira: card.cardFlag,
          tipo: card.cardType,
          validade: formatExpiryDate(card.expiresIn),
          limite:
            card.limit !== null ? formatCurrencyInput(Number(card.limit)) : "",
        }
      : { bandeira: CardFlag.Visa, tipo: CardType.Credito, limite: "" },
  });

  const selectedCardType = Number(useWatch({ control, name: "tipo" }));
  const hasCredit = selectedCardType !== CardType.Debito;

  const nome = register("nome", { required: requiredMessage });
  const ultimosDigitos = register("ultimosDigitos", {
    required: requiredMessage,
  });
  const validade = register("validade", { required: requiredMessage });
  const limite = register("limite", {
    validate: (value, formValues) =>
      Number(formValues.tipo) === CardType.Debito || !!value || requiredMessage,
  });

  const handleInvalid = useInvalidFormToast();

  const onSubmit: SubmitHandler<NewCardFormData> = (data) => {
    const payload = {
      name: data.nome,
      cardType: Number(data.tipo),
      cardFlag: Number(data.bandeira),
      expiresIn: data.validade,
      lastFourDigits: data.ultimosDigitos,
      limit: hasCredit
        ? Number(data.limite.replace(/\./g, "").replace(",", "."))
        : null,
    };

    if (isEditMode && card) {
      updateCard.mutate(
        { id: card.id, ...payload },
        { onSuccess: () => onClose() }
      );
      return;
    }

    createCard.mutate(payload, { onSuccess: () => onClose() });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit, handleInvalid)}>
      <FormInput.Text
        label="Nome"
        placeholder="Ex: Itaú"
        required
        error={errors.nome?.message}
        {...nome}
      />
      <FormInput.Text
        label="Últimos quatro dígitos"
        placeholder="Ex: 1234"
        inputMode="numeric"
        maxLength={4}
        required
        error={errors.ultimosDigitos?.message}
        {...ultimosDigitos}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          event.target.value = maskDigitsOnly(event.target.value, 4);
          ultimosDigitos.onChange(event);
        }}
      />
      <Controller
        name="bandeira"
        control={control}
        rules={{ required: requiredMessage }}
        render={({ field }) => (
          <FormInput.Select
            label="Bandeira"
            options={CardFlagOptions}
            required
            error={errors.bandeira?.message}
            ref={field.ref}
            value={String(field.value ?? "")}
            onChange={(value) => field.onChange(Number(value))}
            onBlur={field.onBlur}
          />
        )}
      />
      <Controller
        name="tipo"
        control={control}
        rules={{ required: requiredMessage }}
        render={({ field }) => (
          <FormInput.Select
            label="Tipo"
            options={CardTypeOptions}
            required
            error={errors.tipo?.message}
            ref={field.ref}
            value={String(field.value ?? "")}
            onChange={(value) => field.onChange(Number(value))}
            onBlur={field.onBlur}
          />
        )}
      />
      <FormInput.Text
        label="Validade"
        placeholder="Ex: 01/12"
        inputMode="numeric"
        maxLength={5}
        required
        error={errors.validade?.message}
        {...validade}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          event.target.value = maskExpiryDate(event.target.value);
          validade.onChange(event);
        }}
      />
      {hasCredit && (
        <FormInput.Text
          label="Limite"
          placeholder="Ex: 4.000,00"
          inputMode="numeric"
          required
          error={errors.limite?.message}
          {...limite}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            event.target.value = maskCurrency(event.target.value);
            limite.onChange(event);
          }}
        />
      )}
      <S.Actions>
        <Button type="submit">{isEditMode ? "Atualizar" : "Salvar"}</Button>
        <Button
          variant="cancel"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </S.Actions>
    </FormWrapper>
  );
};
