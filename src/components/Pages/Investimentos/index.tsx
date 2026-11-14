"use client";

import { Landmark, Plus, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { useTheme } from "styled-components";
import { FormInput } from "@/components/Atoms/FormInput";
import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { PageWrapper } from "@/components/Molecules/PageWrapper";
import { TransactionsBoard } from "@/components/Organisms/TransactionsBoard";
import { InvestmentMovementType } from "@/constants/enums/investment-movement-type-enum";
import { InvestmentStatusOptions } from "@/constants/enums/investment-status-enum";
import { useModalContext } from "@/contexts/ModalContext";
import { useBankAccount } from "@/hooks/useBankAccount";
import { useConfirm } from "@/hooks/useConfirm";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { useInvestment, useInvestmentsList } from "@/hooks/useInvestment";
import {
  Investment,
  InvestmentMovement,
} from "@/services/investimentos/InvestmentService/types";
import { currentMonth, formatMonthLabel } from "@/utils/date";
import { formatPercentValue } from "@/utils/investment";
import { parseOptionalNumber } from "@/utils/parse";
import { NewInvestment } from "./FormModal";
import { InvestmentRow } from "./InvestmentRow";
import { InvestmentsTable } from "./InvestmentsTable";
import { MovementModal } from "./MovementModal";
import { ValueModal } from "./ValueModal";

const allOption = { value: "", label: "Todos" };

const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

const sum = (items: Investment[], key: keyof Investment) =>
  items.reduce((total, item) => total + Number(item[key]), 0);

export const InvestimentosPage = () => {
  const formatCurrency = useFormatCurrency();
  const theme = useTheme();
  const { openModal } = useModalContext();
  const { confirm, confirmSteps } = useConfirm();
  const { deleteInvestment, deleteMovement } = useInvestment();
  const { loadAllBankAccounts } = useBankAccount();
  const [month, setMonth] = useState(currentMonth);
  const [status, setStatus] = useState("0");
  const [bankAccountId, setBankAccountId] = useState("");

  const loadInvestments = useInvestmentsList({
    month,
    status: parseOptionalNumber(status),
    bankAccountId: parseOptionalNumber(bankAccountId),
  });
  const investments = loadInvestments.data ?? [];

  const accountOptions = [
    allOption,
    ...(loadAllBankAccounts.data ?? []).map((account) => ({
      value: account.id,
      label: account.name,
    })),
  ];

  const total = sum(investments, "currentAmount");
  const invested = sum(investments, "investedAmount");
  const totalYield = sum(investments, "yieldAmount");
  const monthYield = sum(investments, "monthYield");
  const signed = (value: number) =>
    `${value < 0 ? "−" : "+"} ${formatCurrency(Math.abs(value))}`;
  const toneOf = (value: number) =>
    value < 0 ? theme.colors.danger : theme.colors.success;

  const handleCreate = () => {
    openModal({
      title: "Novo Investimento",
      render: (close) => <NewInvestment onClose={close} />,
    });
  };

  const handleEdit = (investment: Investment) => {
    openModal({
      title: "Editar Investimento",
      render: (close) => (
        <NewInvestment
          onClose={close}
          investment={investment}
        />
      ),
    });
  };

  const handleDelete = (investment: Investment) => {
    confirmSteps(
      [
        {
          title: "Excluir investimento",
          message: `Ao excluir "${investment.name}", todas as movimentações dele também são excluídas e os aportes e resgates deixam de contar no saldo da conta vinculada.`,
          confirmLabel: "Estou ciente, prosseguir",
          danger: true,
        },
        {
          title: "Confirmar exclusão",
          message: `Tem certeza que deseja excluir definitivamente "${investment.name}"? Esta ação não é reversível.`,
          confirmLabel: "Excluir investimento",
          danger: true,
        },
      ],
      () => deleteInvestment.mutate({ id: investment.id })
    );
  };

  const handleMovement = (
    investment: Investment,
    type: InvestmentMovementType
  ) => {
    openModal({
      title:
        type === InvestmentMovementType.Resgate
          ? "Novo Resgate"
          : "Novo Aporte",
      render: (close) => (
        <MovementModal
          onClose={close}
          investment={investment}
          initialType={type}
        />
      ),
    });
  };

  const handleEditMovement = (
    investment: Investment,
    movement: InvestmentMovement
  ) => {
    openModal({
      title: "Editar Movimentação",
      render: (close) => (
        <MovementModal
          onClose={close}
          investment={investment}
          movement={movement}
        />
      ),
    });
  };

  const handleDeleteMovement = (movement: InvestmentMovement) => {
    confirm({
      title: "Excluir movimentação",
      message:
        "Tem certeza que deseja excluir esta movimentação? Se for um aporte ou resgate, o saldo da conta vinculada também é ajustado.",
      confirmLabel: "Excluir",
      danger: true,
      onConfirm: () => deleteMovement.mutate({ id: movement.id }),
    });
  };

  const handleUpdateValue = (investment: Investment) => {
    openModal({
      title: "Atualizar Valor",
      render: (close) => (
        <ValueModal
          onClose={close}
          investment={investment}
        />
      ),
    });
  };

  const emptyMessage =
    status === "" && bankAccountId === ""
      ? "Nenhum investimento cadastrado ainda."
      : "Nenhum investimento com esses filtros.";

  return (
    <PageWrapper
      title="Investimentos"
      description="Acompanhe aportes, resgates e rendimentos"
      action={
        <SpecularButton
          size="sm"
          onClick={handleCreate}
        >
          <Plus size={18} /> Novo Investimento
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
              options={[...InvestmentStatusOptions, allOption]}
              value={status}
              onChange={setStatus}
            />
            <FormInput.Select
              label="Conta"
              compact
              options={accountOptions}
              value={bankAccountId}
              onChange={setBankAccountId}
            />
          </>
        }
        summary={[
          {
            title: "Patrimônio",
            value: formatCurrency(total),
            description: `${formatCurrency(invested)} investidos em ${pluralize(
              investments.length,
              "aplicação",
              "aplicações"
            )}`,
            icon: <Wallet size={20} />,
          },
          {
            title: "Rendimento no Mês",
            value: signed(monthYield),
            description: formatMonthLabel(month),
            icon: (
              <TrendingUp
                size={20}
                color={toneOf(monthYield)}
              />
            ),
            color: toneOf(monthYield),
          },
          {
            title: "Rendimento Total",
            value: signed(totalYield),
            description:
              invested > 0
                ? `${formatPercentValue((totalYield / invested) * 100)} sobre o valor investido`
                : "Sem valor investido",
            icon: (
              <Landmark
                size={20}
                color={toneOf(totalYield)}
              />
            ),
            color: toneOf(totalYield),
          },
        ]}
        listTitle="Investimentos"
        count={investments.length}
        isLoading={loadInvestments.isLoading}
        emptyMessage={emptyMessage}
        table={
          <InvestmentsTable
            investments={investments}
            emptyMessage={emptyMessage}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        }
      >
        {investments.map((investment) => (
          <InvestmentRow
            key={investment.id}
            investment={investment}
            onEdit={() => handleEdit(investment)}
            onDelete={() => handleDelete(investment)}
            onMovement={(type) => handleMovement(investment, type)}
            onUpdateValue={() => handleUpdateValue(investment)}
            onEditMovement={(movement) =>
              handleEditMovement(investment, movement)
            }
            onDeleteMovement={handleDeleteMovement}
          />
        ))}
      </TransactionsBoard>
    </PageWrapper>
  );
};
