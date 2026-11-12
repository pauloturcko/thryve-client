import { useMemo } from "react";
import {
  createDataTableColumns,
  DataTable,
} from "@/components/Molecules/DataTable";
import {
  ActionsCell,
  AmountCell,
  EMPTY_CELL,
  StatusCell,
  TitleCell,
} from "@/components/Organisms/TransactionCells";
import {
  ExpenseKind,
  ExpenseKindLabels,
} from "@/constants/enums/expense-kind-enum";
import {
  ExpenseStatusLabels,
  TransactionStatus,
} from "@/constants/enums/transaction-status-enum";
import { Expense } from "@/services/expense-service";
import { formatDateBR } from "@/utils/date";

const column = createDataTableColumns<Expense>();

type ExpensesTableProps = {
  expenses: Expense[];
  emptyMessage: string;
  onToggleStatus: (expense: Expense) => void;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
};

export const ExpensesTable = ({
  expenses,
  emptyMessage,
  onToggleStatus,
  onEdit,
  onDelete,
}: ExpensesTableProps) => {
  const columns = useMemo(
    () =>
      column.columns([
        column.accessor("description", {
          header: "Descrição",
          cell: ({ row }) => (
            <TitleCell
              title={row.original.description}
              category={row.original.category}
            />
          ),
        }),
        column.accessor("date", {
          header: "Data",
          cell: (info) => formatDateBR(info.getValue()),
        }),
        column.accessor("dueDate", {
          header: "Vencimento",
          cell: (info) => {
            const dueDate = info.getValue();
            return dueDate ? formatDateBR(dueDate) : EMPTY_CELL;
          },
        }),
        column.accessor((expense) => expense.category.name, {
          id: "category",
          header: "Categoria",
        }),
        column.accessor("expenseKind", {
          header: "Tipo",
          cell: (info) => ExpenseKindLabels[info.getValue() as ExpenseKind],
        }),
        column.accessor((expense) => expense.paymentMethod?.name, {
          id: "paymentMethod",
          header: "Pagamento",
          cell: (info) => info.getValue() ?? EMPTY_CELL,
        }),
        column.accessor((expense) => expense.card?.name, {
          id: "card",
          header: "Cartão",
          cell: (info) => info.getValue() ?? EMPTY_CELL,
        }),
        column.accessor("installmentTotal", {
          header: "Parcela",
          cell: ({ row }) =>
            row.original.installmentTotal
              ? `${row.original.installmentNumber}/${row.original.installmentTotal}`
              : EMPTY_CELL,
          meta: { align: "center" },
        }),
        column.accessor((expense) => expense.bankAccount?.name, {
          id: "bankAccount",
          header: "Conta",
          cell: (info) => info.getValue() ?? EMPTY_CELL,
        }),
        column.accessor("status", {
          header: "Status",
          cell: ({ row }) => {
            const isPaid = row.original.status === TransactionStatus.Pago;

            return (
              <StatusCell
                isPaid={isPaid}
                label={
                  ExpenseStatusLabels[row.original.status as TransactionStatus]
                }
                toggleLabel={
                  isPaid ? "Marcar como pendente" : "Marcar como pago"
                }
                onToggle={() => onToggleStatus(row.original)}
              />
            );
          },
        }),
        column.accessor("amount", {
          header: "Valor",
          cell: (info) => (
            <AmountCell
              amount={Number(info.getValue())}
              variant="expense"
            />
          ),
          meta: { align: "right" },
        }),
        column.display({
          id: "actions",
          header: "Ações",
          cell: ({ row }) => (
            <ActionsCell
              itemName={row.original.description}
              onEdit={() => onEdit(row.original)}
              onDelete={() => onDelete(row.original)}
            />
          ),
          meta: { align: "center", pinned: "right" },
        }),
      ]),
    [onToggleStatus, onEdit, onDelete]
  );

  return (
    <DataTable
      data={expenses}
      columns={columns}
      emptyMessage={emptyMessage}
      maxHeight="min(70vh, 40rem)"
    />
  );
};
