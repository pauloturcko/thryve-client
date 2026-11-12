"use client";

import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { FormInput } from "@/components/Atoms/FormInput";
import { PageWrapper } from "@/components/Molecules/PageWrapper";
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
import { useModalContext } from "@/contexts/ModalContext";
import { useCategory } from "@/hooks/useCategory";
import { useConfirm } from "@/hooks/useConfirm";
import { useExpense, useExpensesList } from "@/hooks/useExpense";
import { usePaymentPreference } from "@/hooks/usePaymentPreference";
import { Expense } from "@/services/expense-service";
import { currentMonth, formatDateBR } from "@/utils/date";
import { parseOptionalNumber, sumAmounts } from "@/utils/parse";
import { CircleCheck, Clock, Plus, TrendingDown } from "lucide-react";
import { useState } from "react";
import { useTheme } from "styled-components";
import { ExpensesTable } from "./ExpensesTable";
import { NewExpense } from "./FormModal";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";

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
  const formatCurrency = useFormatCurrency();
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

  const handleFilterChange = (name: keyof FilterState) => (value: string) =>
    setFilters((current) => ({ ...current, [name]: value }));

  const handleCreate = () => {
    openModal({
      title: "Novo Gasto",
      render: (close) => <NewExpense onClose={close} />,
    });
  };

  const handleEdit = (expense: Expense) => {
    openModal({
      title: "Editar Gasto",
      render: (close) => (
        <NewExpense
          onClose={close}
          expense={expense}
        />
      ),
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
    <PageWrapper
      title="Gastos"
      description="Acompanhe seus gastos do mês"
      action={
        <SpecularButton
          size="sm"
          onClick={handleCreate}
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
              options={[allOption, ...ExpenseStatusOptions]}
              value={filters.status}
              onChange={handleFilterChange("status")}
            />
            <FormInput.Segment
              label="Tipo"
              options={[allOption, ...ExpenseKindOptions]}
              value={filters.expenseKind}
              onChange={handleFilterChange("expenseKind")}
            />
            <FormInput.Select
              label="Categoria"
              compact
              options={categoryOptions}
              value={filters.categoryId}
              onChange={handleFilterChange("categoryId")}
            />
            <FormInput.Select
              label="Pagamento"
              compact
              options={paymentMethodOptions}
              value={filters.paymentMethodId}
              onChange={handleFilterChange("paymentMethodId")}
            />
          </>
        }
        summary={[
          {
            title: "Total do Mês",
            value: formatCurrency(total),
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
            value: formatCurrency(paid),
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
            value: formatCurrency(pending),
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
        table={
          <ExpensesTable
            expenses={expenses}
            emptyMessage="Nenhum gasto lançado neste mês."
            onToggleStatus={handleToggleStatus}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        }
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
    </PageWrapper>
  );
};
