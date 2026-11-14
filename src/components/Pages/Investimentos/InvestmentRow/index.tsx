"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  Landmark,
  RefreshCw,
} from "lucide-react";
import { useId, useState } from "react";
import { ItemActions } from "@/components/Atoms/ItemActions";
import { IndexType } from "@/constants/enums/index-type-enum";
import {
  InvestmentMovementType,
  InvestmentMovementTypeLabels,
} from "@/constants/enums/investment-movement-type-enum";
import { InvestmentStatus } from "@/constants/enums/investment-status-enum";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { useInvestmentMovements } from "@/hooks/useInvestment";
import {
  Investment,
  InvestmentMovement,
} from "@/services/investimentos/InvestmentService/types";
import { formatDateBR } from "@/utils/date";
import {
  formatPercentValue,
  movementEffect,
  rateLabel,
} from "@/utils/investment";
import * as S from "./styles";

type InvestmentRowProps = {
  investment: Investment;
  onEdit: () => void;
  onDelete: () => void;
  onMovement: (type: InvestmentMovementType) => void;
  onUpdateValue: () => void;
  onEditMovement: (movement: InvestmentMovement) => void;
  onDeleteMovement: (movement: InvestmentMovement) => void;
};

export const InvestmentRow = ({
  investment,
  onEdit,
  onDelete,
  onMovement,
  onUpdateValue,
  onEditMovement,
  onDeleteMovement,
}: InvestmentRowProps) => {
  const formatCurrency = useFormatCurrency();
  const panelId = useId();
  const [expanded, setExpanded] = useState(false);
  const movements = useInvestmentMovements(
    { investmentId: investment.id },
    expanded
  );

  const yieldAmount = Number(investment.yieldAmount);
  const monthYield = Number(investment.monthYield);
  const estimatedYield = Number(investment.estimatedYield);
  const redeemed = investment.status === InvestmentStatus.Resgatado;
  const signed = (value: number) =>
    `${value < 0 ? "−" : "+"} ${formatCurrency(Math.abs(value))}`;

  const details = [
    rateLabel(investment),
    investment.bankAccount?.name,
    investment.maturityDate
      ? `vence ${formatDateBR(investment.maturityDate)}`
      : null,
  ].filter(Boolean);

  return (
    <S.Card
      data-expanded={expanded ? "" : undefined}
      $muted={redeemed}
    >
      <S.Row>
        <S.Toggle
          type="button"
          aria-expanded={expanded}
          aria-controls={panelId}
          onClick={() => setExpanded((open) => !open)}
        >
          <S.IconWrapper>
            <Landmark size={20} />
          </S.IconWrapper>
          <S.Info>
            <S.Title>
              {investment.name}
              {redeemed && <S.Badge>Resgatado</S.Badge>}
            </S.Title>
            <S.Details>{details.join(" • ")}</S.Details>
          </S.Info>
        </S.Toggle>
        <S.Yield $negative={yieldAmount < 0}>
          {signed(yieldAmount)}
          {investment.yieldPercentage !== null && (
            <small>{formatPercentValue(investment.yieldPercentage)}</small>
          )}
        </S.Yield>
        <S.Amount>
          {formatCurrency(Number(investment.currentAmount))}
          <small>
            investido {formatCurrency(Number(investment.investedAmount))}
          </small>
        </S.Amount>
        <S.Actions>
          <S.Chevron
            type="button"
            aria-label={
              expanded
                ? `Recolher ${investment.name}`
                : `Ver detalhes de ${investment.name}`
            }
            aria-expanded={expanded}
            aria-controls={panelId}
            onClick={() => setExpanded((open) => !open)}
          >
            <ChevronDown size={18} />
          </S.Chevron>
          <ItemActions
            itemName={investment.name}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </S.Actions>
      </S.Row>

      {expanded && (
        <S.Panel id={panelId}>
          <S.Facts>
            <div>
              <dt>Rendimento no mês</dt>
              <dd>
                <S.Signed $negative={monthYield < 0}>
                  {signed(monthYield)}
                </S.Signed>
              </dd>
            </div>
            {investment.indexType !== IndexType.Nenhum && (
              <div>
                <dt>Estimativa pelo índice</dt>
                <dd>
                  {formatCurrency(Number(investment.estimatedAmount))}
                  <small>
                    {estimatedYield !== 0
                      ? `${signed(estimatedYield)} ainda não lançado`
                      : investment.ratesUpdatedUntil
                        ? `Taxas até ${formatDateBR(investment.ratesUpdatedUntil)}`
                        : "Taxas ainda indisponíveis"}
                  </small>
                </dd>
              </div>
            )}
            <div>
              <dt>Aplicado em</dt>
              <dd>
                {investment.startDate
                  ? formatDateBR(investment.startDate)
                  : "—"}
                <small>
                  {formatCurrency(Number(investment.initialAmount))} na
                  aplicação inicial
                </small>
              </dd>
            </div>
            <div>
              <dt>Taxa atual</dt>
              <dd>
                {investment.currentAnnualRate
                  ? `${formatPercentValue(investment.currentAnnualRate)} a.a.`
                  : "—"}
                <small>{rateLabel(investment)}</small>
              </dd>
            </div>
          </S.Facts>

          <S.QuickActions>
            <S.QuickAction
              type="button"
              onClick={() => onMovement(InvestmentMovementType.Aporte)}
            >
              <ArrowDownLeft size={16} /> Aportar
            </S.QuickAction>
            <S.QuickAction
              type="button"
              onClick={() => onMovement(InvestmentMovementType.Resgate)}
            >
              <ArrowUpRight size={16} /> Resgatar
            </S.QuickAction>
            <S.QuickAction
              type="button"
              onClick={onUpdateValue}
            >
              <RefreshCw size={16} /> Atualizar valor
            </S.QuickAction>
            {investment.notes && <S.Notes>{investment.notes}</S.Notes>}
          </S.QuickActions>

          <S.Movements>
            <S.MovementsTitle>Movimentações</S.MovementsTitle>
            {movements.isLoading && <S.Muted>Carregando...</S.Muted>}
            {!movements.isLoading && (movements.data ?? []).length === 0 && (
              <S.Muted>Nenhuma movimentação registrada.</S.Muted>
            )}
            <S.MovementList>
              {(movements.data ?? []).map((movement) => {
                const effect = movementEffect(movement);
                const label =
                  InvestmentMovementTypeLabels[
                    movement.type as InvestmentMovementType
                  ];
                return (
                  <S.Movement key={movement.id}>
                    <S.MovementDate>
                      {formatDateBR(movement.date)}
                    </S.MovementDate>
                    <S.MovementType $type={movement.type}>
                      {label}
                    </S.MovementType>
                    <S.MovementNotes>{movement.notes ?? ""}</S.MovementNotes>
                    <S.Signed $negative={effect < 0}>{signed(effect)}</S.Signed>
                    <ItemActions
                      itemName={`${label.toLowerCase()} de ${formatDateBR(movement.date)}`}
                      iconSize={26}
                      onEdit={() => onEditMovement(movement)}
                      onDelete={() => onDeleteMovement(movement)}
                    />
                  </S.Movement>
                );
              })}
            </S.MovementList>
          </S.Movements>
        </S.Panel>
      )}
    </S.Card>
  );
};
