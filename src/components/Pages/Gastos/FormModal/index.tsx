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
import { CardType } from "@/constants/enums/card-type-enum";
import { PaymentMethod } from "@/constants/enums/payment-method-enum";
import {
  PurchaseMode,
  PurchaseModeOptions,
} from "@/constants/enums/purchase-mode-enum";
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
import { useInvalidFormToast } from "@/hooks/useInvalidFormToast";

type NewExpenseFormData = {
  descricao: string;
  tipo: string;
  valor: string;
  compra?: string;
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
          compra: String(PurchaseMode.AVista),
          parcelas: "2",
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
          compra: String(PurchaseMode.AVista),
          parcelas: "2",
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
    validate: (value, formValues) => {
      if (Number(formValues.compra) !== PurchaseMode.Parcelado) return true;
      const total = Number(value);
      if (!Number.isInteger(total) || total < 2) return "Mínimo de 2 parcelas";
      if (total > 48) return "Máximo de 48 parcelas";
      return true;
    },
  });
  const data = register("data", { required: requiredMessage });
  const vencimento = register("vencimento");
  const observacoes = register("observacoes", {
    maxLength: { value: 500, message: "Máximo de 500 caracteres" },
  });

  const selectedPaymentMethodId = useWatch({ control, name: "formaPagamento" });
  const purchaseMode = useWatch({ control, name: "compra" });
  const installments = Number(useWatch({ control, name: "parcelas" })) || 0;
  const amount = parseCurrencyInput(useWatch({ control, name: "valor" }));

  const preferences = loadPaymentPreferences.data ?? [];
  const selectedPreference = preferences.find(
    (preference) =>
      preference.paymentMethodId === Number(selectedPaymentMethodId)
  );
  const selectedMethod = selectedPreference?.paymentMethodId;
  const requiresCard = !!selectedPreference?.paymentMethod.requiresCard;
  const isCreditCard = selectedMethod === PaymentMethod.CartaoCredito;
  const showPurchaseMode = isCreditCard && !isEditMode;
  const isInstallment =
    showPurchaseMode && Number(purchaseMode) === PurchaseMode.Parcelado;

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
  const incompatibleCardType =
    selectedMethod === PaymentMethod.CartaoCredito
      ? CardType.Debito
      : selectedMethod === PaymentMethod.CartaoDebito
        ? CardType.Credito
        : null;
  const cardOptions = [
    placeholderOption,
    ...(loadAllCards.data ?? [])
      .filter(
        (card) =>
          card.cardType !== incompatibleCardType || card.id === expense?.cardId
      )
      .map((card) => ({
        value: card.id,
        label: `${card.name} •••• ${card.lastFourDigits}`,
      })),
  ];

  const missingAccounts = loadAllBankAccounts.data?.length === 0;
  const missingCategories =
    loadAllCategories.isSuccess && expenseCategories.length === 0;

  const handleInvalid = useInvalidFormToast();

  const cardSelect = (
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
  );
  const purchaseModeSelect = (
    <Controller
      name="compra"
      control={control}
      shouldUnregister
      render={({ field }) => (
        <FormInput.Select
          label="Compra"
          options={PurchaseModeOptions}
          {...field}
          value={field.value ?? String(PurchaseMode.AVista)}
        />
      )}
    />
  );

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

    createExpense.mutate(
      {
        ...payload,
        installments: isInstallment ? Number(formData.parcelas) : undefined,
      },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit, handleInvalid)}>
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
      <FormInput.Text
        label={isInstallment ? "Valor total" : "Valor"}
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
            <FormInput.Select
              label="Tipo"
              options={ExpenseKindOptions}
              required
              error={errors.tipo?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field }) => (
            <FormInput.Select
              label="Status"
              options={ExpenseStatusOptions}
              required
              error={errors.status?.message}
              {...field}
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
        {showPurchaseMode ? purchaseModeSelect : requiresCard && cardSelect}
      </S.Row>
      {showPurchaseMode && (
        <S.Row>
          {cardSelect}
          {isInstallment && (
            <FormInput.Text
              label="Parcelas"
              type="number"
              min={2}
              max={48}
              required
              error={errors.parcelas?.message}
              {...parcelas}
            />
          )}
        </S.Row>
      )}
      {isInstallment && installments >= 2 && amount > 0 && (
        <S.Hint>
          {installments}x de {formatCurrencyBRL(amount / installments)}, uma por
          mês a partir da data do gasto.
        </S.Hint>
      )}
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
