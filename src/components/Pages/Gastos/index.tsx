"use client";

import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { FormInput } from "@/components/Atoms/FormInput";
import { SettingsWrapper } from "@/components/Molecules/SettingsWrapper";
import { TransactionInfo } from "@/components/Organisms/TransactionInfo";
import { TransactionsBoard } from "@/components/Organisms/TransactionsBoard";
import { CategoryType } from "@/constants/enums/category-type-enum";
import {
  ExpenseKind,
  ExpenseKindLabels,
  ExpenseKindOptions,
} from "@/constants/enums/expense-kind-enum";
import {
  ExpenseStatusLabels,
  ExpenseStatusOptions,
  TransactionStatus,
} from "@/constants/enums/transaction-status-enum";
import { BaseModalProps, useModalContext } from "@/contexts/ModalContext";
import { useCategory } from "@/hooks/useCategory";
import { useConfirm } from "@/hooks/useConfirm";
import { useExpense, useExpensesList } from "@/hooks/useExpense";
import { usePaymentPreference } from "@/hooks/usePaymentPreference";
import { Expense } from "@/services/expense-service";
import { currentMonth, formatDateBR } from "@/utils/date";
import { formatCurrencyBRL } from "@/utils/format";
import { parseOptionalNumber, sumAmounts } from "@/utils/parse";
import { CircleCheck, Clock, Plus, TrendingDown } from "lucide-react";
import { ChangeEvent, ComponentType, useState } from "react";
import { useTheme } from "styled-components";
import { NewExpense } from "./FormModal";

type FilterState = {
  status: string;
  expenseKind: string;
  categoryId: string;
  paymentMethodId: string;
};

const initialFilters: FilterState = {
  status: "",
  expenseKind: "",
  categoryId: "",
  paymentMethodId: "",
};

const allOption = { value: "", label: "Todos" };

const ExpenseFormContent = ({ onClose }: { onClose: () => void }) => (
  <NewExpense onClose={onClose} />
);

const EditExpenseFormContent = ({
  onClose,
  expense,
}: {
  onClose: () => void;
  expense: Expense;
}) => (
  <NewExpense
    onClose={onClose}
    expense={expense}
  />
);

const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

const paymentLabel = (expense: Expense) => {
  if (!expense.paymentMethod) return null;
  if (!expense.card) return expense.paymentMethod.name;

  return `${expense.paymentMethod.name} (${expense.card.name})`;
};

const installmentLabel = (expense: Expense) =>
  expense.installmentTotal
    ? `Parcela ${expense.installmentNumber}/${expense.installmentTotal}`
    : null;

export const GastosPage = () => {
  const theme = useTheme();
  const { openModal } = useModalContext();
  const { confirm } = useConfirm();
  const { updateExpense, deleteExpense } = useExpense();
  const { loadAllCategories } = useCategory();
  const { loadPaymentPreferences } = usePaymentPreference();
  const [month, setMonth] = useState(currentMonth);
  const [filters, setFilters] = useState(initialFilters);

  const loadExpenses = useExpensesList({
    month,
    status: parseOptionalNumber(filters.status),
    expenseKind: parseOptionalNumber(filters.expenseKind),
    categoryId: parseOptionalNumber(filters.categoryId),
    paymentMethodId: parseOptionalNumber(filters.paymentMethodId),
  });
  const expenses = loadExpenses.data ?? [];

  const categoryOptions = [
    allOption,
    ...(loadAllCategories.data ?? [])
      .filter((category) => category.type === CategoryType.Despesa)
      .map((category) => ({ value: category.id, label: category.name })),
  ];
  const paymentMethodOptions = [
    allOption,
    ...(loadPaymentPreferences.data ?? []).map((preference) => ({
      value: preference.paymentMethodId,
      label: preference.paymentMethod.name,
    })),
  ];

  const total = sumAmounts(expenses);
  const pendingExpenses = expenses.filter(
    (expense) => expense.status === TransactionStatus.Pendente
  );
  const pending = sumAmounts(pendingExpenses);
  const paid = total - pending;
  const paidShare = total > 0 ? Math.round((paid / total) * 100) : 0;

  const handleSegmentChange = (name: keyof FilterState) => (value: string) =>
    setFilters((current) => ({ ...current, [name]: value }));

  const handleFilterChange =
    (name: keyof FilterState) => (event: ChangeEvent<HTMLSelectElement>) =>
      setFilters((current) => ({ ...current, [name]: event.target.value }));

  const handleOpenModal = () => {
    openModal({
      component: ExpenseFormContent,
      title: "Novo Gasto",
    });
  };

  const handleEdit = (expense: Expense) => {
    openModal({
      component:
        EditExpenseFormContent as unknown as ComponentType<BaseModalProps>,
      title: "Editar Gasto",
      props: { expense },
    });
  };

  const handleDelete = (expense: Expense) => {
    const installmentWarning = expense.installmentTotal
      ? ` Só a parcela ${expense.installmentNumber} de ${expense.installmentTotal} será excluída.`
      : "";

    confirm({
      title: "Excluir gasto",
      message: `Tem certeza que deseja excluir o gasto "${expense.description}"?${installmentWarning} Essa ação não pode ser desfeita.`,
      confirmLabel: "Excluir",
      danger: true,
      onConfirm: () => deleteExpense.mutate({ id: expense.id }),
    });
  };

  const handleToggleStatus = (expense: Expense) => {
    updateExpense.mutate({
      id: expense.id,
      status:
        expense.status === TransactionStatus.Pago
          ? TransactionStatus.Pendente
          : TransactionStatus.Pago,
    });
  };

  return (
    <SettingsWrapper
      title="Gastos"
      description="Acompanhe seus gastos do mês"
      button={
        <SpecularButton
          size="sm"
          onClick={handleOpenModal}
        >
          <Plus size={18} /> Novo Gasto
        </SpecularButton>
      }
    >
      <TransactionsBoard
        month={month}
        onMonthChange={setMonth}
        filters={
          <>
            <FormInput.Segment
              label="Status"
              size="sm"
              options={[allOption, ...ExpenseStatusOptions]}
              value={filters.status}
              onChange={handleSegmentChange("status")}
            />
            <FormInput.Segment
              label="Tipo"
              size="sm"
              options={[allOption, ...ExpenseKindOptions]}
              value={filters.expenseKind}
              onChange={handleSegmentChange("expenseKind")}
            />
            <FormInput.Select
              label="Categoria"
              options={categoryOptions}
              value={filters.categoryId}
              onChange={handleFilterChange("categoryId")}
            />
            <FormInput.Select
              label="Pagamento"
              options={paymentMethodOptions}
              value={filters.paymentMethodId}
              onChange={handleFilterChange("paymentMethodId")}
            />
          </>
        }
        summary={[
          {
            title: "Total do Mês",
            value: formatCurrencyBRL(total),
            description: pluralize(expenses.length, "gasto", "gastos"),
            icon: (
              <TrendingDown
                size={20}
                color={theme.colors.danger}
              />
            ),
            color: theme.colors.danger,
          },
          {
            title: "Pago",
            value: formatCurrencyBRL(paid),
            description: `${paidShare}% do total`,
            icon: (
              <CircleCheck
                size={20}
                color={theme.colors.success}
              />
            ),
          },
          {
            title: "A Pagar",
            value: formatCurrencyBRL(pending),
            description: pluralize(
              pendingExpenses.length,
              "pendente",
              "pendentes"
            ),
            icon: (
              <Clock
                size={20}
                color={theme.colors.warning}
              />
            ),
            color: theme.colors.warning,
          },
        ]}
        listTitle="Gastos"
        count={expenses.length}
        isLoading={loadExpenses.isLoading}
        emptyMessage="Nenhum gasto lançado neste mês."
      >
        {expenses.map((expense) => {
          const isPaid = expense.status === TransactionStatus.Pago;

          return (
            <TransactionInfo
              key={expense.id}
              title={expense.description}
              details={[
                formatDateBR(expense.date),
                expense.dueDate && `Vence ${formatDateBR(expense.dueDate)}`,
                expense.category.name,
                paymentLabel(expense),
                installmentLabel(expense),
                ExpenseKindLabels[expense.expenseKind as ExpenseKind],
              ]}
              category={expense.category}
              amount={Number(expense.amount)}
              variant="expense"
              isPaid={isPaid}
              statusLabel={
                ExpenseStatusLabels[expense.status as TransactionStatus]
              }
              toggleStatusLabel={
                isPaid ? "Marcar como pendente" : "Marcar como pago"
              }
              onToggleStatus={() => handleToggleStatus(expense)}
              onEdit={() => handleEdit(expense)}
              onDelete={() => handleDelete(expense)}
            />
          );
        })}
      </TransactionsBoard>
    </SettingsWrapper>
  );
};
