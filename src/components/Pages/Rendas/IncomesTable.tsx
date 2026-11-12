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
  IncomeKind,
  IncomeKindLabels,
} from "@/constants/enums/income-kind-enum";
import {
  IncomeStatusLabels,
  TransactionStatus,
} from "@/constants/enums/transaction-status-enum";
import { Income } from "@/services/income-service";
import { formatDateBR } from "@/utils/date";

const column = createDataTableColumns<Income>();

export const incomeTitle = (income: Income) =>
  income.source || income.category.name;

type IncomesTableProps = {
  incomes: Income[];
  emptyMessage: string;
  onToggleStatus: (income: Income) => void;
  onEdit: (income: Income) => void;
  onDelete: (income: Income, title: string) => void;
};

export const IncomesTable = ({
  incomes,
  emptyMessage,
  onToggleStatus,
  onEdit,
  onDelete,
}: IncomesTableProps) => {
  const columns = useMemo(
    () =>
      column.columns([
        column.accessor(incomeTitle, {
          id: "title",
          header: "Descrição",
          cell: ({ row }) => (
            <TitleCell
              title={incomeTitle(row.original)}
              category={row.original.category}
            />
          ),
        }),
        column.accessor("date", {
          header: "Data",
          cell: (info) => formatDateBR(info.getValue()),
        }),
        column.accessor((income) => income.category.name, {
          id: "category",
          header: "Categoria",
        }),
        column.accessor("incomeKind", {
          header: "Tipo",
          cell: (info) => IncomeKindLabels[info.getValue() as IncomeKind],
        }),
        column.accessor((income) => income.bankAccount?.name, {
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
                  IncomeStatusLabels[row.original.status as TransactionStatus]
                }
                toggleLabel={
                  isPaid ? "Marcar como pendente" : "Marcar como recebido"
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
              variant="income"
            />
          ),
          meta: { align: "right" },
        }),
        column.display({
          id: "actions",
          header: "Ações",
          cell: ({ row }) => (
            <ActionsCell
              itemName={incomeTitle(row.original)}
              onEdit={() => onEdit(row.original)}
              onDelete={() => onDelete(row.original, incomeTitle(row.original))}
            />
          ),
          meta: { align: "center", pinned: "right" },
        }),
      ]),
    [onToggleStatus, onEdit, onDelete]
  );

  return (
    <DataTable
      data={incomes}
      columns={columns}
      emptyMessage={emptyMessage}
      maxHeight="min(70vh, 40rem)"
    />
  );
};
