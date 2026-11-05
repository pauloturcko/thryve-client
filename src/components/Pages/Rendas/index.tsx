"use client";

import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { FormInput } from "@/components/Atoms/FormInput";
import { PageWrapper } from "@/components/Molecules/PageWrapper";
import { TransactionInfo } from "@/components/Organisms/TransactionInfo";
import { TransactionsBoard } from "@/components/Organisms/TransactionsBoard";
import { CategoryType } from "@/constants/enums/category-type-enum";
import {
  IncomeKind,
  IncomeKindLabels,
  IncomeKindOptions,
} from "@/constants/enums/income-kind-enum";
import {
  IncomeStatusLabels,
  IncomeStatusOptions,
  TransactionStatus,
} from "@/constants/enums/transaction-status-enum";
import { useModalContext } from "@/contexts/ModalContext";
import { useCategory } from "@/hooks/useCategory";
import { useConfirm } from "@/hooks/useConfirm";
import { useIncome, useIncomesList } from "@/hooks/useIncome";
import { Income } from "@/services/income-service";
import { currentMonth, formatDateBR } from "@/utils/date";
import { formatCurrencyBRL } from "@/utils/format";
import { parseOptionalNumber, sumAmounts } from "@/utils/parse";
import { CircleCheck, Clock, Plus, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useTheme } from "styled-components";
import { NewIncome } from "./FormModal";

type FilterState = {
  status: string;
  incomeKind: string;
  categoryId: string;
};

const initialFilters: FilterState = {
  status: "",
  incomeKind: "",
  categoryId: "",
};

const allOption = { value: "", label: "Todos" };

const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

export const RendasPage = () => {
  const theme = useTheme();
  const { openModal } = useModalContext();
  const { confirm } = useConfirm();
  const { updateIncome, deleteIncome } = useIncome();
  const { loadAllCategories } = useCategory();
  const [month, setMonth] = useState(currentMonth);
  const [filters, setFilters] = useState(initialFilters);

  const loadIncomes = useIncomesList({
    month,
    status: parseOptionalNumber(filters.status),
    incomeKind: parseOptionalNumber(filters.incomeKind),
    categoryId: parseOptionalNumber(filters.categoryId),
  });
  const incomes = loadIncomes.data ?? [];

  const categoryOptions = [
    allOption,
    ...(loadAllCategories.data ?? [])
      .filter((category) => category.type === CategoryType.Receita)
      .map((category) => ({ value: category.id, label: category.name })),
  ];

  const total = sumAmounts(incomes);
  const pendingIncomes = incomes.filter(
    (income) => income.status === TransactionStatus.Pendente
  );
  const pending = sumAmounts(pendingIncomes);
  const received = total - pending;
  const receivedShare = total > 0 ? Math.round((received / total) * 100) : 0;

  const handleFilterChange = (name: keyof FilterState) => (value: string) =>
    setFilters((current) => ({ ...current, [name]: value }));

  const handleCreate = () => {
    openModal({
      title: "Nova Receita",
      render: (close) => <NewIncome onClose={close} />,
    });
  };

  const handleEdit = (income: Income) => {
    openModal({
      title: "Editar Receita",
      render: (close) => (
        <NewIncome
          onClose={close}
          income={income}
        />
      ),
    });
  };

  const handleDelete = (income: Income, title: string) => {
    confirm({
      title: "Excluir receita",
      message: `Tem certeza que deseja excluir a receita "${title}"? Essa ação não pode ser desfeita.`,
      confirmLabel: "Excluir",
      danger: true,
      onConfirm: () => deleteIncome.mutate({ id: income.id }),
    });
  };

  const handleToggleStatus = (income: Income) => {
    updateIncome.mutate({
      id: income.id,
      status:
        income.status === TransactionStatus.Pago
          ? TransactionStatus.Pendente
          : TransactionStatus.Pago,
    });
  };

  return (
    <PageWrapper
      title="Rendas"
      description="Acompanhe suas receitas do mês"
      action={
        <SpecularButton
          size="sm"
          onClick={handleCreate}
        >
          <Plus size={18} /> Nova Receita
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
              options={[allOption, ...IncomeStatusOptions]}
              value={filters.status}
              onChange={handleFilterChange("status")}
            />
            <FormInput.Segment
              label="Tipo"
              options={[allOption, ...IncomeKindOptions]}
              value={filters.incomeKind}
              onChange={handleFilterChange("incomeKind")}
            />
            <FormInput.Select
              label="Categoria"
              compact
              options={categoryOptions}
              value={filters.categoryId}
              onChange={handleFilterChange("categoryId")}
            />
          </>
        }
        summary={[
          {
            title: "Total do Mês",
            value: formatCurrencyBRL(total),
            description: pluralize(incomes.length, "receita", "receitas"),
            icon: (
              <TrendingUp
                size={20}
                color={theme.colors.success}
              />
            ),
            color: theme.colors.success,
          },
          {
            title: "Recebido",
            value: formatCurrencyBRL(received),
            description: `${receivedShare}% do total`,
            icon: (
              <CircleCheck
                size={20}
                color={theme.colors.success}
              />
            ),
          },
          {
            title: "A Receber",
            value: formatCurrencyBRL(pending),
            description: pluralize(
              pendingIncomes.length,
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
        listTitle="Receitas"
        count={incomes.length}
        isLoading={loadIncomes.isLoading}
        emptyMessage="Nenhuma receita lançada neste mês."
      >
        {incomes.map((income) => {
          const title = income.source || income.category.name;
          const isPaid = income.status === TransactionStatus.Pago;

          return (
            <TransactionInfo
              key={income.id}
              title={title}
              details={[
                formatDateBR(income.date),
                income.source ? income.category.name : null,
                income.bankAccount?.name,
                IncomeKindLabels[income.incomeKind as IncomeKind],
              ]}
              category={income.category}
              amount={Number(income.amount)}
              variant="income"
              isPaid={isPaid}
              statusLabel={
                IncomeStatusLabels[income.status as TransactionStatus]
              }
              toggleStatusLabel={
                isPaid ? "Marcar como pendente" : "Marcar como recebido"
              }
              onToggleStatus={() => handleToggleStatus(income)}
              onEdit={() => handleEdit(income)}
              onDelete={() => handleDelete(income, title)}
            />
          );
        })}
      </TransactionsBoard>
    </PageWrapper>
  );
};
