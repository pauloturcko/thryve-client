import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/Atoms/FormInput";
import { FormWrapper } from "@/components/Atoms/FormWrapper";
import {
  AccountType,
  AccountTypeOptions,
} from "@/constants/enums/account-type-enum";
import { useBankAccount } from "@/hooks/useBankAccount";
import { BankAccount } from "@/services/bank-account-service";
import { formatCurrencyInput } from "@/utils/format";
import { maskCurrency } from "@/utils/masks";
import { ChangeEvent } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as S from "./styles";
import { useInvalidFormToast } from "@/hooks/useInvalidFormToast";

type NewBankAccountFormData = {
  nome: string;
  tipo: number;
  saldo: string;
};

const requiredMessage = "Campo obrigatório";

export const NewBankAccount = ({
  onClose,
  bankAccount,
}: {
  onClose: () => void;
  bankAccount?: BankAccount;
}) => {
  const { createBankAccount, updateBankAccount } = useBankAccount();
  const isEditMode = !!bankAccount;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewBankAccountFormData>({
    defaultValues: bankAccount
      ? {
          nome: bankAccount.name,
          tipo: bankAccount.accountType,
          saldo: formatCurrencyInput(Number(bankAccount.balance)),
        }
      : { tipo: AccountType.ContaDigital },
  });

  const nome = register("nome", {
    required: requiredMessage,
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
  });
  const saldo = register("saldo");

  const handleInvalid = useInvalidFormToast();

  const onSubmit: SubmitHandler<NewBankAccountFormData> = (data) => {
    const payload = {
      name: data.nome,
      accountType: Number(data.tipo),
      balance: Number(data.saldo.replace(/\./g, "").replace(",", ".")) || 0,
    };

    if (isEditMode && bankAccount) {
      updateBankAccount.mutate(
        { id: bankAccount.id, ...payload },
        { onSuccess: () => onClose() }
      );
      return;
    }

    createBankAccount.mutate(payload, { onSuccess: () => onClose() });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit, handleInvalid)}>
      <FormInput.Text
        label="Nome"
        placeholder="Ex: Nubank"
        required
        error={errors.nome?.message}
        {...nome}
      />
      <Controller
        name="tipo"
        control={control}
        rules={{ required: requiredMessage }}
        render={({ field }) => (
          <FormInput.Select
            label="Tipo"
            options={AccountTypeOptions}
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
        label="Saldo"
        placeholder="Ex: 1.500,00"
        inputMode="numeric"
        error={errors.saldo?.message}
        {...saldo}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          event.target.value = maskCurrency(event.target.value);
          saldo.onChange(event);
        }}
      />
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
