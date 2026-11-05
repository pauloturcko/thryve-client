import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/Atoms/FormInput";
import { FormWrapper } from "@/components/Atoms/FormWrapper";
import { CategoryType } from "@/constants/enums/category-type-enum";
import {
  ExpenseKind,
  ExpenseKindOptions,
} from "@/constants/enums/expense-kind-enum";
import {
  ExpenseStatusOptions,
  TransactionStatus,
} from "@/constants/enums/transaction-status-enum";
import { useBankAccount } from "@/hooks/useBankAccount";
import { useCard } from "@/hooks/useCard";
import { useCategory } from "@/hooks/useCategory";
import { useExpense } from "@/hooks/useExpense";
import { usePaymentPreference } from "@/hooks/usePaymentPreference";
import { Expense } from "@/services/expense-service";
import { todayISO } from "@/utils/date";
import { formatCurrencyBRL, formatCurrencyInput } from "@/utils/format";
import { maskCurrency } from "@/utils/masks";
import { parseCurrencyInput } from "@/utils/parse";
import { ChangeEvent } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import * as S from "./styles";

type NewExpenseFormData = {
  descricao: string;
  tipo: string;
  valor: string;
  parcelas: string;
  data: string;
  vencimento: string;
  status: string;
  categoria: string;
  conta: string;
  formaPagamento: string;
  cartao?: string;
  observacoes: string;
};

const requiredMessage = "Campo obrigatório";
const placeholderOption = { value: "", label: "Selecione" };

export const NewExpense = ({
  onClose,
  expense,
}: {
  onClose: () => void;
  expense?: Expense;
}) => {
  const { createExpense, updateExpense } = useExpense();
  const { loadAllCategories } = useCategory();
  const { loadAllBankAccounts } = useBankAccount();
  const { loadPaymentPreferences } = usePaymentPreference();
  const { loadAllCards } = useCard();
  const isEditMode = !!expense;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewExpenseFormData>({
    defaultValues: expense
      ? {
          descricao: expense.description,
          tipo: String(expense.expenseKind),
          valor: formatCurrencyInput(Number(expense.amount)),
          parcelas: "1",
          data: expense.date,
          vencimento: expense.dueDate ?? "",
          status: String(expense.status),
          categoria: String(expense.categoryId),
          conta: String(expense.bankAccountId),
          formaPagamento: expense.paymentMethodId
            ? String(expense.paymentMethodId)
            : "",
          cartao: expense.cardId ? String(expense.cardId) : "",
          observacoes: expense.notes ?? "",
        }
      : {
          descricao: "",
          tipo: String(ExpenseKind.Variavel),
          valor: "",
          parcelas: "1",
          data: todayISO(),
          vencimento: "",
          status: String(TransactionStatus.Pendente),
          categoria: "",
          conta: "",
          formaPagamento: "",
          cartao: "",
          observacoes: "",
        },
  });

  const descricao = register("descricao", {
    required: requiredMessage,
    maxLength: { value: 150, message: "Máximo de 150 caracteres" },
  });
  const valor = register("valor", {
    required: requiredMessage,
    validate: (value) =>
      parseCurrencyInput(value) > 0 || "Informe um valor maior que zero",
  });
  const parcelas = register("parcelas", {
    min: { value: 1, message: "Mínimo de 1 parcela" },
    max: { value: 48, message: "Máximo de 48 parcelas" },
  });
  const data = register("data", { required: requiredMessage });
  const vencimento = register("vencimento");
  const observacoes = register("observacoes", {
    maxLength: { value: 500, message: "Máximo de 500 caracteres" },
  });

  const selectedPaymentMethodId = useWatch({ control, name: "formaPagamento" });
  const installments = Number(useWatch({ control, name: "parcelas" })) || 1;
  const amount = parseCurrencyInput(useWatch({ control, name: "valor" }));

  const preferences = loadPaymentPreferences.data ?? [];
  const selectedPreference = preferences.find(
    (preference) =>
      preference.paymentMethodId === Number(selectedPaymentMethodId)
  );
  const requiresCard = !!selectedPreference?.paymentMethod.requiresCard;

  const expenseCategories = (loadAllCategories.data ?? []).filter(
    (category) => category.type === CategoryType.Despesa
  );
  const categoryOptions = [
    placeholderOption,
    ...expenseCategories.map((category) => ({
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
  const paymentMethodOptions = [
    placeholderOption,
    ...preferences
      .filter(
        (preference) =>
          preference.isActive ||
          preference.paymentMethodId === expense?.paymentMethodId
      )
      .map((preference) => ({
        value: preference.paymentMethodId,
        label: preference.paymentMethod.name,
      })),
  ];
  const cardOptions = [
    placeholderOption,
    ...(loadAllCards.data ?? []).map((card) => ({
      value: card.id,
      label: `${card.name} •••• ${card.lastFourDigits}`,
    })),
  ];

  const missingAccounts = loadAllBankAccounts.data?.length === 0;
  const missingCategories =
    loadAllCategories.isSuccess && expenseCategories.length === 0;

  const onSubmit: SubmitHandler<NewExpenseFormData> = (formData) => {
    const payload = {
      description: formData.descricao.trim(),
      expenseKind: Number(formData.tipo),
      amount: parseCurrencyInput(formData.valor),
      date: formData.data,
      dueDate: formData.vencimento || null,
      status: Number(formData.status),
      categoryId: Number(formData.categoria),
      bankAccountId: Number(formData.conta),
      paymentMethodId: Number(formData.formaPagamento),
      cardId: requiresCard && formData.cartao ? Number(formData.cartao) : null,
      notes: formData.observacoes.trim() || null,
    };

    if (isEditMode && expense) {
      updateExpense.mutate(
        { id: expense.id, ...payload },
        { onSuccess: () => onClose() }
      );
      return;
    }

    const totalInstallments = Number(formData.parcelas) || 1;
    createExpense.mutate(
      {
        ...payload,
        installments: totalInstallments > 1 ? totalInstallments : undefined,
      },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      {missingAccounts && (
        <S.Notice>
          Cadastre uma conta em Configurações › Contas antes de lançar gastos.
        </S.Notice>
      )}
      {missingCategories && (
        <S.Notice>
          Cadastre uma categoria de despesa em Configurações › Categorias.
        </S.Notice>
      )}
      <FormInput.Text
        label="Descrição"
        placeholder="Ex: Aluguel"
        required
        error={errors.descricao?.message}
        {...descricao}
      />
      <S.Row>
        <FormInput.Text
          label={isEditMode ? "Valor" : "Valor total"}
          placeholder="Ex: 1.200,00"
          inputMode="numeric"
          required
          error={errors.valor?.message}
          {...valor}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            event.target.value = maskCurrency(event.target.value);
            valor.onChange(event);
          }}
        />
        {!isEditMode && (
          <FormInput.Text
            label="Parcelas"
            type="number"
            min={1}
            max={48}
            error={errors.parcelas?.message}
            {...parcelas}
          />
        )}
      </S.Row>
      {!isEditMode && installments > 1 && amount > 0 && (
        <S.Hint>
          {installments}x de {formatCurrencyBRL(amount / installments)}, uma por
          mês a partir da data do gasto.
        </S.Hint>
      )}
      {isEditMode && expense?.installmentTotal && (
        <S.Hint>
          Parcela {expense.installmentNumber} de {expense.installmentTotal}: as
          alterações valem só para esta parcela.
        </S.Hint>
      )}
      <S.Row>
        <FormInput.Text
          label="Data"
          type="date"
          required
          error={errors.data?.message}
          {...data}
        />
        <FormInput.Text
          label="Vencimento"
          type="date"
          error={errors.vencimento?.message}
          {...vencimento}
        />
      </S.Row>
      <S.Row>
        <Controller
          name="tipo"
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field }) => (
            <FormInput.Radio
              label="Tipo"
              options={ExpenseKindOptions}
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
              options={ExpenseStatusOptions}
              required
              value={field.value}
              onChange={field.onChange}
              error={errors.status?.message}
            />
          )}
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
      <S.Row>
        <Controller
          name="formaPagamento"
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field }) => (
            <FormInput.Select
              label="Forma de pagamento"
              options={paymentMethodOptions}
              required
              error={errors.formaPagamento?.message}
              {...field}
            />
          )}
        />
        {requiresCard && (
          <Controller
            name="cartao"
            control={control}
            shouldUnregister
            rules={{ required: requiredMessage }}
            render={({ field }) => (
              <FormInput.Select
                label="Cartão"
                options={cardOptions}
                required
                error={errors.cartao?.message}
                {...field}
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
