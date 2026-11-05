import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/Atoms/FormInput";
import { FormWrapper } from "@/components/Atoms/FormWrapper";
import { CategoryType } from "@/constants/enums/category-type-enum";
import {
  IncomeKind,
  IncomeKindOptions,
} from "@/constants/enums/income-kind-enum";
import {
  IncomeStatusOptions,
  TransactionStatus,
} from "@/constants/enums/transaction-status-enum";
import { useBankAccount } from "@/hooks/useBankAccount";
import { useCategory } from "@/hooks/useCategory";
import { useExpensesList } from "@/hooks/useExpense";
import { useIncome } from "@/hooks/useIncome";
import { Income } from "@/services/income-service";
import { formatDateBR, todayISO } from "@/utils/date";
import { formatCurrencyBRL, formatCurrencyInput } from "@/utils/format";
import { maskCurrency } from "@/utils/masks";
import { parseCurrencyInput, parseOptionalNumber } from "@/utils/parse";
import { ChangeEvent } from "react";
import {
  Control,
  Controller,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";
import * as S from "./styles";

type NewIncomeFormData = {
  tipo: string;
  valor: string;
  data: string;
  status: string;
  categoria: string;
  conta: string;
  fonte: string;
  observacoes: string;
  gastoVinculado?: string;
};

const requiredMessage = "Campo obrigatório";
const placeholderOption = { value: "", label: "Selecione" };

const LinkedExpenseField = ({
  control,
}: {
  control: Control<NewIncomeFormData>;
}) => {
  const loadExpenses = useExpensesList();

  const expenseOptions = [
    { value: "", label: "Nenhum" },
    ...(loadExpenses.data ?? []).map((expense) => ({
      value: expense.id,
      label: `${expense.description} • ${formatDateBR(expense.date)} • ${formatCurrencyBRL(Number(expense.amount))}`,
    })),
  ];

  return (
    <Controller
      name="gastoVinculado"
      control={control}
      shouldUnregister
      render={({ field }) => (
        <FormInput.Select
          label="Gasto reembolsado"
          options={expenseOptions}
          {...field}
        />
      )}
    />
  );
};

export const NewIncome = ({
  onClose,
  income,
}: {
  onClose: () => void;
  income?: Income;
}) => {
  const { createIncome, updateIncome } = useIncome();
  const { loadAllCategories } = useCategory();
  const { loadAllBankAccounts } = useBankAccount();
  const isEditMode = !!income;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIncomeFormData>({
    defaultValues: income
      ? {
          tipo: String(income.incomeKind),
          valor: formatCurrencyInput(Number(income.amount)),
          data: income.date,
          status: String(income.status),
          categoria: String(income.categoryId),
          conta: String(income.bankAccountId),
          fonte: income.source ?? "",
          observacoes: income.notes ?? "",
          gastoVinculado: income.linkedTransactionId
            ? String(income.linkedTransactionId)
            : "",
        }
      : {
          tipo: String(IncomeKind.Recorrente),
          valor: "",
          data: todayISO(),
          status: String(TransactionStatus.Pendente),
          categoria: "",
          conta: "",
          fonte: "",
          observacoes: "",
          gastoVinculado: "",
        },
  });

  const valor = register("valor", {
    required: requiredMessage,
    validate: (value) =>
      parseCurrencyInput(value) > 0 || "Informe um valor maior que zero",
  });
  const data = register("data", { required: requiredMessage });
  const fonte = register("fonte", {
    maxLength: { value: 100, message: "Máximo de 100 caracteres" },
  });
  const observacoes = register("observacoes", {
    maxLength: { value: 500, message: "Máximo de 500 caracteres" },
  });
  const selectedKind = useWatch({ control, name: "tipo" });
  const isRefund = Number(selectedKind) === IncomeKind.Reembolso;

  const incomeCategories = (loadAllCategories.data ?? []).filter(
    (category) => category.type === CategoryType.Receita
  );
  const categoryOptions = [
    placeholderOption,
    ...incomeCategories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];
  const accountOptions = [
    placeholderOption,
    ...(loadAllBankAccounts.data ?? []).map((bankAccount) => ({
      value: bankAccount.id,
      label: bankAccount.name,
    })),
  ];

  const missingAccounts = loadAllBankAccounts.data?.length === 0;
  const missingCategories =
    loadAllCategories.isSuccess && incomeCategories.length === 0;

  const onSubmit: SubmitHandler<NewIncomeFormData> = (formData) => {
    const payload = {
      incomeKind: Number(formData.tipo),
      amount: parseCurrencyInput(formData.valor),
      date: formData.data,
      status: Number(formData.status),
      categoryId: Number(formData.categoria),
      bankAccountId: Number(formData.conta),
      source: formData.fonte.trim() || null,
      notes: formData.observacoes.trim() || null,
      linkedTransactionId: isRefund
        ? (parseOptionalNumber(formData.gastoVinculado) ?? null)
        : null,
    };

    if (isEditMode && income) {
      updateIncome.mutate(
        { id: income.id, ...payload },
        { onSuccess: () => onClose() }
      );
      return;
    }

    createIncome.mutate(payload, { onSuccess: () => onClose() });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      {missingAccounts && (
        <S.Notice>
          Cadastre uma conta em Configurações › Contas antes de lançar receitas.
        </S.Notice>
      )}
      {missingCategories && (
        <S.Notice>
          Cadastre uma categoria de receita em Configurações › Categorias.
        </S.Notice>
      )}
      <S.Row>
        <Controller
          name="tipo"
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field }) => (
            <FormInput.Radio
              label="Tipo"
              options={IncomeKindOptions}
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.tipo?.message}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field }) => (
            <FormInput.Radio
              label="Status"
              options={IncomeStatusOptions}
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.status?.message}
            />
          )}
        />
      </S.Row>
      <S.Row>
        <FormInput.Text
          label="Valor"
          placeholder="Ex: 5.000,00"
          inputMode="numeric"
          required
          error={errors.valor?.message}
          {...valor}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            event.target.value = maskCurrency(event.target.value);
            valor.onChange(event);
          }}
        />
        <FormInput.Text
          label="Data"
          type="date"
          required
          error={errors.data?.message}
          {...data}
        />
      </S.Row>
      <S.Row>
        <Controller
          name="categoria"
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field }) => (
            <FormInput.Select
              label="Categoria"
              options={categoryOptions}
              required
              error={errors.categoria?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="conta"
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field }) => (
            <FormInput.Select
              label="Conta"
              options={accountOptions}
              required
              error={errors.conta?.message}
              {...field}
            />
          )}
        />
      </S.Row>
      <FormInput.Text
        label="Fonte"
        placeholder="Ex: Salário empresa X"
        error={errors.fonte?.message}
        {...fonte}
      />
      {isRefund && <LinkedExpenseField control={control} />}
      <FormInput.Text
        label="Observações"
        placeholder="Opcional"
        error={errors.observacoes?.message}
        {...observacoes}
      />
      <S.Actions>
        <Button
          type="submit"
          rounded="0.5rem"
          height="2.5rem"
          color="textPrimary"
          width="100%"
        >
          {isEditMode ? "Atualizar" : "Salvar"}
        </Button>
        <Button
          type="button"
          onClick={onClose}
          rounded="0.5rem"
          height="2.5rem"
          border
          hover="danger"
          background="transparent"
          color="textPrimary"
          width="100%"
        >
          Cancelar
        </Button>
      </S.Actions>
    </FormWrapper>
  );
};
