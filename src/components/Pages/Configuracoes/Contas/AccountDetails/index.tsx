import { StatusBadge } from "@/components/Atoms/StatusBadge";
import {
  createDataTableColumns,
  DataTable,
} from "@/components/Molecules/DataTable";
import {
  EntityDetailsHeader,
  EntityDetailsSection,
  EntityDetailsStats,
  TransactionDescription,
} from "@/components/Molecules/EntityDetails";
import {
  AccountType,
  AccountTypeLabels,
} from "@/constants/enums/account-type-enum";
import {
  ExpenseStatusLabels,
  IncomeStatusLabels,
  TransactionStatus,
} from "@/constants/enums/transaction-status-enum";
import { BankAccount } from "@/services/bank-account-service";
import { Expense } from "@/services/expense-service";
import { Income } from "@/services/income-service";
import { currentMonth, formatDateBR, todayISO } from "@/utils/date";
import { formatCurrencyBRL } from "@/utils/format";
import { sumAmounts } from "@/utils/parse";
import * as S from "./styles";

const RECENT_TRANSACTIONS_LIMIT = 5;

type AccountTransaction = {
  key: string;
  date: string;
  title: string;
  subtitle: string | null;
  category: string;
  isIncome: boolean;
  status: TransactionStatus;
  amount: number;
};

const fromExpense = (expense: Expense): AccountTransaction => ({
  key: `expense-${expense.id}`,
  date: expense.date,
  title: expense.description,
  subtitle: expense.installmentTotal
    ? `Parcela ${expense.installmentNumber}/${expense.installmentTotal}`
    : null,
  category: expense.category.name,
  isIncome: false,
  status: expense.status,
  amount: Number(expense.amount),
});

const fromIncome = (income: Income): AccountTransaction => ({
  key: `income-${income.id}`,
  date: income.date,
  title: income.source || income.category.name,
  subtitle: null,
  category: income.category.name,
  isIncome: true,
  status: income.status,
  amount: Number(income.amount),
});

const column = createDataTableColumns<AccountTransaction>();

const columns = column.columns([
  column.accessor("date", {
    header: "Data",
    cell: (info) => formatDateBR(info.getValue()),
  }),
  column.accessor("title", {
    header: "Descrição",
    cell: ({ row }) => (
      <TransactionDescription>
        {row.original.title}
        {row.original.subtitle && <span>{row.original.subtitle}</span>}
      </TransactionDescription>
    ),
  }),
  column.accessor("category", {
    header: "Categoria",
  }),
  column.accessor("status", {
    header: "Status",
    cell: ({ row }) => {
      const { status, isIncome } = row.original;
      const labels = isIncome ? IncomeStatusLabels : ExpenseStatusLabels;

      return (
        <StatusBadge $isPaid={status === TransactionStatus.Pago}>
          {labels[status]}
        </StatusBadge>
      );
    },
  }),
  column.accessor("amount", {
    header: "Valor",
    cell: ({ row }) => (
      <S.Amount $isIncome={row.original.isIncome}>
        {row.original.isIncome ? "+ " : "− "}
        {formatCurrencyBRL(row.original.amount)}
      </S.Amount>
    ),
    meta: { align: "right" },
  }),
]);

type AccountDetailsProps = {
  bankAccount: BankAccount;
  expenses: Expense[];
  incomes: Income[];
  isLoading: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export const AccountDetails = ({
  bankAccount,
  expenses,
  incomes,
  isLoading,
  onEdit,
  onDelete,
}: AccountDetailsProps) => {
  const today = todayISO();
  const month = currentMonth();
  const balance = Number(bankAccount.balance);
  const isInMonth = (item: { date: string }) => item.date.startsWith(month);

  const recentTransactions = [
    ...expenses.map(fromExpense),
    ...incomes.map(fromIncome),
  ]
    .filter((transaction) => transaction.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, RECENT_TRANSACTIONS_LIMIT);

  return (
    <>
      <EntityDetailsHeader
        title={bankAccount.name}
        subtitle={AccountTypeLabels[bankAccount.accountType as AccountType]}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <EntityDetailsStats
        stats={[
          {
            label: "Saldo atual",
            value: formatCurrencyBRL(balance),
            negative: balance < 0,
          },
          {
            label: "Entradas no mês",
            value: formatCurrencyBRL(sumAmounts(incomes.filter(isInMonth))),
          },
          {
            label: "Saídas no mês",
            value: formatCurrencyBRL(sumAmounts(expenses.filter(isInMonth))),
          },
        ]}
      />
      <EntityDetailsSection
        title="Últimas transações"
        isLoading={isLoading}
      >
        <DataTable
          data={recentTransactions}
          columns={columns}
          emptyMessage="Nenhuma transação nesta conta ainda."
        />
      </EntityDetailsSection>
    </>
  );
};
