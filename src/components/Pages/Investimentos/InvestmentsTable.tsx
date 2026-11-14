import { useMemo } from "react";
import { StatusBadge } from "@/components/Atoms/StatusBadge";
import {
  createDataTableColumns,
  DataTable,
} from "@/components/Molecules/DataTable";
import {
  ActionsCell,
  EMPTY_CELL,
} from "@/components/Organisms/TransactionCells";
import {
  InvestmentStatus,
  InvestmentStatusLabels,
} from "@/constants/enums/investment-status-enum";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { Investment } from "@/services/investimentos/InvestmentService/types";
import { formatDateBR } from "@/utils/date";
import { formatPercentValue, rateLabel } from "@/utils/investment";

const column = createDataTableColumns<Investment>();

type InvestmentsTableProps = {
  investments: Investment[];
  emptyMessage: string;
  onEdit: (investment: Investment) => void;
  onDelete: (investment: Investment) => void;
};

export const InvestmentsTable = ({
  investments,
  emptyMessage,
  onEdit,
  onDelete,
}: InvestmentsTableProps) => {
  const formatCurrency = useFormatCurrency();

  const columns = useMemo(
    () =>
      column.columns([
        column.accessor("name", { header: "Investimento" }),
        column.accessor(rateLabel, { id: "rate", header: "Rentabilidade" }),
        column.accessor((investment) => investment.bankAccount?.name, {
          id: "account",
          header: "Conta",
          cell: (info) => info.getValue() ?? EMPTY_CELL,
        }),
        column.accessor("maturityDate", {
          header: "Vencimento",
          cell: (info) => {
            const value = info.getValue();
            return value ? formatDateBR(value) : EMPTY_CELL;
          },
        }),
        column.accessor("status", {
          header: "Status",
          cell: (info) => (
            <StatusBadge $isPaid={info.getValue() === InvestmentStatus.Ativo}>
              {InvestmentStatusLabels[info.getValue() as InvestmentStatus]}
            </StatusBadge>
          ),
        }),
        column.accessor("investedAmount", {
          header: "Investido",
          cell: (info) => formatCurrency(Number(info.getValue())),
          meta: { align: "right" },
        }),
        column.accessor("yieldAmount", {
          header: "Rendimento",
          cell: ({ row }) => {
            const value = Number(row.original.yieldAmount);
            const percentage = row.original.yieldPercentage;
            return `${value < 0 ? "−" : "+"} ${formatCurrency(Math.abs(value))}${
              percentage !== null ? ` (${formatPercentValue(percentage)})` : ""
            }`;
          },
          meta: { align: "right" },
        }),
        column.accessor("currentAmount", {
          header: "Valor atual",
          cell: (info) => formatCurrency(Number(info.getValue())),
          meta: { align: "right" },
        }),
        column.display({
          id: "actions",
          header: "",
          cell: ({ row }) => (
            <ActionsCell
              itemName={row.original.name}
              onEdit={() => onEdit(row.original)}
              onDelete={() => onDelete(row.original)}
            />
          ),
          meta: { align: "right", pinned: "right" },
        }),
      ]),
    [formatCurrency, onEdit, onDelete]
  );

  return (
    <DataTable
      data={investments}
      columns={columns}
      emptyMessage={emptyMessage}
    />
  );
};
