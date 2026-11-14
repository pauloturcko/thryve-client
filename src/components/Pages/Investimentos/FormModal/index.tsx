import { ChangeEvent } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
  useWatch,
} from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/Atoms/FormInput";
import { FormWrapper } from "@/components/Atoms/FormWrapper";
import {
  IndexType,
  IndexTypeLabels,
  IndexTypeOptions,
} from "@/constants/enums/index-type-enum";
import {
  InvestmentStatus,
  InvestmentStatusOptions,
} from "@/constants/enums/investment-status-enum";
import { useBankAccount } from "@/hooks/useBankAccount";
import { useInvalidFormToast } from "@/hooks/useInvalidFormToast";
import { useInvestment } from "@/hooks/useInvestment";
import { Investment } from "@/services/investimentos/InvestmentService/types";
import { todayISO } from "@/utils/date";
import { maskCurrency } from "@/utils/masks";
import { parseCurrencyInput } from "@/utils/parse";
import { isValidRate, normalizeRate } from "@/utils/investment";
import * as S from "./styles";

type InvestmentFormData = {
  nome: string;
  conta: string;
  indexador: number;
  percentual: string;
  taxa: string;
  valorInicial: string;
  data: string;
  vencimento: string;
  status: number;
  observacoes: string;
};

const requiredMessage = "Campo obrigatório";
const placeholderOption = { value: "", label: "Selecione" };

const toInputRate = (value: string) => String(Number(value)).replace(".", ",");

export const withCurrencyMask = (field: UseFormRegisterReturn) => ({
  ...field,
  onChange: (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = maskCurrency(event.target.value);
    return field.onChange(event);
  },
});

export const NewInvestment = ({
  onClose,
  investment,
}: {
  onClose: () => void;
  investment?: Investment;
}) => {
  const { createInvestment, updateInvestment } = useInvestment();
  const { loadAllBankAccounts } = useBankAccount();
  const isEditMode = !!investment;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvestmentFormData>({
    defaultValues: investment
      ? {
          nome: investment.name,
          conta: String(investment.bankAccountId),
          indexador: investment.indexType,
          percentual: toInputRate(investment.indexPercentage),
          taxa: toInputRate(investment.spreadRate),
          valorInicial: "",
          data: "",
          vencimento: investment.maturityDate ?? "",
          status: investment.status,
          observacoes: investment.notes ?? "",
        }
      : {
          nome: "",
          conta: "",
          indexador: IndexType.Cdi,
          percentual: "100",
          taxa: "",
          valorInicial: "",
          data: todayISO(),
          vencimento: "",
          status: InvestmentStatus.Ativo,
          observacoes: "",
        },
  });

  const indexType = Number(useWatch({ control, name: "indexador" }));
  const usesPercentage = [
    IndexType.Selic,
    IndexType.Cdi,
    IndexType.Ipca,
  ].includes(indexType);
  const isPrefixed = indexType === IndexType.PreFixado;
  const usesRate = indexType !== IndexType.Nenhum;

  const nome = register("nome", {
    required: requiredMessage,
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
  });
  const percentual = register("percentual", {
    validate: (value) => {
      if (!usesPercentage) return true;
      if (!isValidRate(value, 2)) return "Percentual inválido";
      const percentage = Number(normalizeRate(value));
      return (
        (percentage > 0 && percentage <= 1000) ||
        "Informe um percentual entre 0 e 1000"
      );
    },
  });
  const taxa = register("taxa", {
    validate: (value) => {
      if (!usesRate) return true;
      if (!value) return isPrefixed ? "Informe a taxa ao ano" : true;
      if (!isValidRate(value, 4)) return "Taxa inválida";
      const rate = Number(normalizeRate(value));
      if (isPrefixed && rate <= 0) return "A taxa deve ser maior que zero";
      return (
        (rate > -100 && rate <= 100) || "A taxa deve estar entre -100 e 100"
      );
    },
  });
  const valorInicial = register("valorInicial", {
    validate: (value) =>
      isEditMode || parseCurrencyInput(value) > 0 || "Informe o valor aplicado",
  });
  const data = register("data", {
    validate: (value) => isEditMode || !!value || requiredMessage,
  });
  const vencimento = register("vencimento");
  const observacoes = register("observacoes", {
    maxLength: { value: 500, message: "Máximo de 500 caracteres" },
  });

  const handleInvalid = useInvalidFormToast();

  const accountOptions = [
    placeholderOption,
    ...(loadAllBankAccounts.data ?? []).map((account) => ({
      value: String(account.id),
      label: account.name,
    })),
  ];
  const missingAccounts = loadAllBankAccounts.data?.length === 0;

  const onSubmit: SubmitHandler<InvestmentFormData> = (formData) => {
    const rates = {
      indexType: Number(formData.indexador),
      indexPercentage: usesPercentage
        ? normalizeRate(formData.percentual)
        : "100",
      spreadRate:
        usesRate && formData.taxa ? normalizeRate(formData.taxa) : "0",
    };
    const shared = {
      name: formData.nome.trim(),
      bankAccountId: Number(formData.conta),
      ...rates,
      maturityDate: formData.vencimento || null,
      notes: formData.observacoes.trim() || null,
    };

    if (isEditMode && investment) {
      updateInvestment.mutate(
        { id: investment.id, ...shared, status: Number(formData.status) },
        { onSuccess: () => onClose() }
      );
      return;
    }

    createInvestment.mutate(
      {
        ...shared,
        initialAmount: parseCurrencyInput(formData.valorInicial),
        date: formData.data,
      },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit, handleInvalid)}>
      {missingAccounts && (
        <S.Notice>
          Cadastre uma conta em Configurações antes de registrar um
          investimento. É dela que sai o valor aplicado.
        </S.Notice>
      )}
      <FormInput.Text
        label="Nome"
        placeholder="Ex: CDB Banco Inter 2028"
        required
        error={errors.nome?.message}
        {...nome}
      />
      <Controller
        name="conta"
        control={control}
        rules={{ required: requiredMessage }}
        render={({ field }) => (
          <FormInput.Select
            label="Conta vinculada"
            options={accountOptions}
            required
            error={errors.conta?.message}
            ref={field.ref}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      <S.Hint>
        Aportes saem do saldo desta conta e resgates voltam para ela.
      </S.Hint>
      <S.Row>
        <Controller
          name="indexador"
          control={control}
          render={({ field }) => (
            <FormInput.Select
              label="Indexador"
              options={IndexTypeOptions}
              required
              ref={field.ref}
              value={String(field.value)}
              onChange={(value) => field.onChange(Number(value))}
              onBlur={field.onBlur}
            />
          )}
        />
        {usesPercentage ? (
          <FormInput.Text
            label={`% do ${IndexTypeLabels[indexType as IndexType]}`}
            placeholder="Ex: 110"
            inputMode="decimal"
            required
            error={errors.percentual?.message}
            {...percentual}
          />
        ) : (
          usesRate && (
            <FormInput.Text
              label="Taxa ao ano (%)"
              placeholder="Ex: 12,5"
              inputMode="decimal"
              required
              error={errors.taxa?.message}
              {...taxa}
            />
          )
        )}
      </S.Row>
      {usesPercentage && (
        <FormInput.Text
          label="Taxa adicional ao ano (%)"
          placeholder={indexType === IndexType.Ipca ? "Ex: 6,5" : "Opcional"}
          inputMode="decimal"
          error={errors.taxa?.message}
          {...taxa}
        />
      )}
      {!isEditMode && (
        <S.Row>
          <FormInput.Text
            label="Valor aplicado"
            placeholder="Ex: 5.000,00"
            inputMode="numeric"
            required
            error={errors.valorInicial?.message}
            {...withCurrencyMask(valorInicial)}
          />
          <FormInput.Text
            label="Data da aplicação"
            type="date"
            required
            error={errors.data?.message}
            {...data}
          />
        </S.Row>
      )}
      <S.Row>
        <FormInput.Text
          label="Vencimento"
          type="date"
          error={errors.vencimento?.message}
          {...vencimento}
        />
        {isEditMode && (
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormInput.Select
                label="Status"
                options={InvestmentStatusOptions}
                ref={field.ref}
                value={String(field.value)}
                onChange={(value) => field.onChange(Number(value))}
                onBlur={field.onBlur}
              />
            )}
          />
        )}
      </S.Row>
      <FormInput.Text
        label="Observações"
        placeholder="Opcional"
        error={errors.observacoes?.message}
        {...observacoes}
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
