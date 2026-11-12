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
import { CardType, CardTypeLabels } from "@/constants/enums/card-type-enum";
import {
  ExpenseStatusLabels,
  TransactionStatus,
} from "@/constants/enums/transaction-status-enum";
import { Card } from "@/services/card-service";
import { Expense } from "@/services/expense-service";
import { currentMonth, formatDateBR, todayISO } from "@/utils/date";
import { formatExpiryDate } from "@/utils/format";
import { sumAmounts } from "@/utils/parse";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { Money } from "@/components/Atoms/Money";

const RECENT_TRANSACTIONS_LIMIT = 5;

const column = createDataTableColumns<Expense>();

const columns = column.columns([
  column.accessor("date", {
    header: "Data",
    cell: (info) => formatDateBR(info.getValue()),
  }),
  column.accessor("description", {
    header: "Descrição",
    cell: ({ row }) => (
      <TransactionDescription>
        {row.original.description}
        {row.original.installmentTotal && (
          <span>
            Parcela {row.original.installmentNumber}/
            {row.original.installmentTotal}
          </span>
        )}
      </TransactionDescription>
    ),
  }),
  column.accessor((expense) => expense.category.name, {
    id: "category",
    header: "Categoria",
  }),
  column.accessor("status", {
    header: "Status",
    cell: (info) => {
      const status = info.getValue() as TransactionStatus;

      return (
        <StatusBadge $isPaid={status === TransactionStatus.Pago}>
          {ExpenseStatusLabels[status]}
        </StatusBadge>
      );
    },
  }),
  column.accessor("amount", {
    header: "Valor",
    cell: (info) => <Money value={Number(info.getValue())} />,
    meta: { align: "right" },
  }),
]);

const thirdStat = (
  card: Card,
  monthCount: number,
  formatCurrency: (value: number) => string
) => {
  if (card.cardType === CardType.Debito) {
    return { label: "Compras no mês", value: String(monthCount) };
  }

  return {
    label: "Limite",
    value:
      card.limit !== null
        ? formatCurrency(Number(card.limit))
        : "Não informado",
  };
};

type CardDetailsProps = {
  card: Card;
  expenses: Expense[];
  isLoading: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export const CardDetails = ({
  card,
  expenses,
  isLoading,
  onEdit,
  onDelete,
}: CardDetailsProps) => {
  const formatCurrency = useFormatCurrency();
  const today = todayISO();
  const month = currentMonth();

  const recentExpenses = expenses
    .filter((expense) => expense.date <= today)
    .slice(0, RECENT_TRANSACTIONS_LIMIT);
  const monthExpenses = expenses.filter((expense) =>
    expense.date.startsWith(month)
  );
  const monthTotal = sumAmounts(monthExpenses);
  const pendingTotal = sumAmounts(
    expenses.filter((expense) => expense.status === TransactionStatus.Pendente)
  );

  return (
    <>
      <EntityDetailsHeader
        title={card.name}
        subtitle={`Final ${card.lastFourDigits} · ${CardTypeLabels[card.cardType as CardType]} · Validade ${formatExpiryDate(card.expiresIn)}`}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <EntityDetailsStats
        stats={[
          { label: "Gasto no mês", value: formatCurrency(monthTotal) },
          { label: "Pendente", value: formatCurrency(pendingTotal) },
          thirdStat(card, monthExpenses.length, formatCurrency),
        ]}
      />
      <EntityDetailsSection
        title="Últimas transações"
        isLoading={isLoading}
      >
        <DataTable
          data={recentExpenses}
          columns={columns}
          emptyMessage="Nenhuma transação neste cartão ainda."
        />
      </EntityDetailsSection>
    </>
  );
};
