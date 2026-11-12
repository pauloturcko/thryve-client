"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "styled-components";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  MoneyReceiveSquareIcon,
  MoneySendSquareIcon,
  PieChartIcon,
  SaveMoneyDollarIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { MagicBento, MagicBentoItem } from "@/components/Organisms/MagicBento";
import { formatDateBR, formatMonthLabel } from "@/utils/date";
import { BalanceChart } from "./BalanceChart";
import { useDashboardData } from "./useDashboardData";
import * as S from "./styles";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";

const pluralize = (count: number, singular: string, plural: string) =>
  `${count} ${count === 1 ? singular : plural}`;

const percent = (value: number) => `${Math.round(value * 100)}%`;

export const DashboardPage = () => {
  const formatCurrency = useFormatCurrency();
  const theme = useTheme();
  const router = useRouter();
  const { month, totals, changes, counts, balanceSeries, slices, upcoming } =
    useDashboardData();
  const monthLabel = formatMonthLabel(month);

  const delta = (change: number | null, goodWhenUp: boolean) => {
    if (change === null)
      return <S.Delta $tone="neutral">sem mês anterior</S.Delta>;
    const good = change === 0 ? true : change > 0 === goodWhenUp;
    return (
      <S.Delta $tone={good ? "good" : "bad"}>
        {change > 0 ? "▲" : change < 0 ? "▼" : "•"} {Math.abs(change)}% vs mês
        anterior
      </S.Delta>
    );
  };

  const items: MagicBentoItem[] = [
    {
      id: "balance",
      colSpan: 2,
      rowSpan: 2,
      background: theme.colors.heroCard,
      content: (
        <>
          <MagicBento.Header>
            <span>Saldo de {monthLabel.toLowerCase()}</span>
            <MagicBento.IconBadge $color={theme.colors.primaryText}>
              <HugeiconsIcon icon={Wallet01Icon} />
            </MagicBento.IconBadge>
          </MagicBento.Header>
          <S.Hero>
            <MagicBento.Figure
              $size="xl"
              $color={totals.balance < 0 ? theme.colors.danger : undefined}
            >
              {formatCurrency(totals.balance)}
            </MagicBento.Figure>
            <MagicBento.Note>
              Receitas menos gastos lançados no mês
            </MagicBento.Note>
          </S.Hero>
          <BalanceChart
            points={balanceSeries}
            monthLabel={monthLabel}
          />
          <S.Split aria-hidden="true">
            <S.SplitBar
              style={{
                flexGrow: totals.incomes || 1,
                background: theme.colors.success,
              }}
            />
            <S.SplitBar
              style={{
                flexGrow: totals.expenses || 1,
                background: theme.colors.danger,
              }}
            />
          </S.Split>
          <S.Legend $columns={2}>
            <S.LegendItem>
              <S.LegendLabel>
                <i style={{ background: theme.colors.success }} />
                <span>Receitas</span>
              </S.LegendLabel>
              <S.LegendValue>{formatCurrency(totals.incomes)}</S.LegendValue>
            </S.LegendItem>
            <S.LegendItem>
              <S.LegendLabel>
                <i style={{ background: theme.colors.danger }} />
                <span>Gastos</span>
              </S.LegendLabel>
              <S.LegendValue>{formatCurrency(totals.expenses)}</S.LegendValue>
            </S.LegendItem>
          </S.Legend>
        </>
      ),
    },
    {
      id: "incomes",
      label: "Abrir rendas",
      onClick: () => router.push("/rendas"),
      content: (
        <>
          <MagicBento.Header>
            <span>Receitas</span>
            <MagicBento.IconBadge $color={theme.colors.success}>
              <HugeiconsIcon icon={MoneyReceiveSquareIcon} />
            </MagicBento.IconBadge>
          </MagicBento.Header>
          <MagicBento.Footer>
            <MagicBento.Figure $size="lg">
              {formatCurrency(totals.incomes)}
            </MagicBento.Figure>
            {delta(changes.incomes, true)}
          </MagicBento.Footer>
        </>
      ),
    },
    {
      id: "expenses",
      label: "Abrir gastos",
      onClick: () => router.push("/gastos"),
      content: (
        <>
          <MagicBento.Header>
            <span>Gastos</span>
            <MagicBento.IconBadge $color={theme.colors.danger}>
              <HugeiconsIcon icon={MoneySendSquareIcon} />
            </MagicBento.IconBadge>
          </MagicBento.Header>
          <MagicBento.Footer>
            <MagicBento.Figure $size="lg">
              {formatCurrency(totals.expenses)}
            </MagicBento.Figure>
            {delta(changes.expenses, false)}
          </MagicBento.Footer>
        </>
      ),
    },
    {
      id: "pending",
      label: "Ver gastos a pagar",
      onClick: () => router.push("/gastos"),
      content: (
        <>
          <MagicBento.Header>
            <span>A pagar</span>
            <MagicBento.IconBadge $color={theme.colors.warning}>
              <HugeiconsIcon icon={Calendar03Icon} />
            </MagicBento.IconBadge>
          </MagicBento.Header>
          <MagicBento.Footer>
            <MagicBento.Figure $size="lg">
              {formatCurrency(totals.pending)}
            </MagicBento.Figure>
            <MagicBento.Note>
              {totals.pendingCount > 0
                ? pluralize(
                    totals.pendingCount,
                    "conta pendente",
                    "contas pendentes"
                  )
                : "Tudo pago este mês"}
            </MagicBento.Note>
          </MagicBento.Footer>
        </>
      ),
    },
    {
      id: "savings",
      background: theme.colors.accentCard,
      content: (
        <>
          <MagicBento.Header>
            <span>Taxa de economia</span>
            <MagicBento.IconBadge $color={theme.colors.accentText}>
              <HugeiconsIcon icon={SaveMoneyDollarIcon} />
            </MagicBento.IconBadge>
          </MagicBento.Header>
          <S.Ring
            role="img"
            aria-label={`Você guardou ${percent(totals.savingsRate)} da renda do mês`}
            style={{ ["--value" as string]: totals.savingsRate }}
          >
            <MagicBento.Figure
              $size="lg"
              $color={theme.colors.accentText}
            >
              {percent(totals.savingsRate)}
            </MagicBento.Figure>
            <MagicBento.Note>da renda ficou com você</MagicBento.Note>
          </S.Ring>
        </>
      ),
    },
    {
      id: "categories",
      colSpan: 2,
      content: (
        <>
          <MagicBento.Header>
            <span>Para onde foi o dinheiro</span>
            <MagicBento.IconBadge>
              <HugeiconsIcon icon={PieChartIcon} />
            </MagicBento.IconBadge>
          </MagicBento.Header>
          {slices.length === 0 ? (
            <MagicBento.Note>
              Nenhum gasto lançado em {monthLabel.toLowerCase()}.
            </MagicBento.Note>
          ) : (
            <MagicBento.Footer>
              <S.Stack aria-hidden="true">
                {slices.map((slice) => (
                  <S.StackPart
                    key={slice.id}
                    style={{
                      flexGrow: slice.share,
                      background: slice.color || theme.colors.textMuted,
                    }}
                  />
                ))}
              </S.Stack>
              <S.Legend $columns={slices.length}>
                {slices.map((slice) => (
                  <S.LegendItem key={slice.id}>
                    <S.LegendLabel>
                      <i
                        style={{
                          background: slice.color || theme.colors.textMuted,
                        }}
                      />
                      <span>{slice.name}</span>
                    </S.LegendLabel>
                    <S.LegendValue>
                      {formatCurrency(slice.total)}
                      <small>{percent(slice.share)}</small>
                    </S.LegendValue>
                  </S.LegendItem>
                ))}
              </S.Legend>
            </MagicBento.Footer>
          )}
        </>
      ),
    },
    {
      id: "upcoming",
      colSpan: 2,
      content: (
        <>
          <MagicBento.Header>
            <span>Próximos vencimentos</span>
            <S.HeaderNote>
              {pluralize(counts.expenses, "gasto no mês", "gastos no mês")}
            </S.HeaderNote>
          </MagicBento.Header>
          {upcoming.length === 0 ? (
            <MagicBento.Note>Nada pendente. Bom trabalho.</MagicBento.Note>
          ) : (
            <S.Upcoming>
              {upcoming.map((expense) => (
                <li key={expense.id}>
                  <S.DueDate>
                    <strong>
                      {(expense.dueDate ?? expense.date).slice(8, 10)}
                    </strong>
                    <span>
                      {formatDateBR(expense.dueDate ?? expense.date).slice(
                        3,
                        5
                      )}
                    </span>
                  </S.DueDate>
                  <S.DueInfo>
                    <span>{expense.description}</span>
                    <small>{expense.category.name}</small>
                  </S.DueInfo>
                  <S.DueAmount>
                    {formatCurrency(Number(expense.amount))}
                  </S.DueAmount>
                </li>
              ))}
            </S.Upcoming>
          )}
        </>
      ),
    },
  ];

  return (
    <S.Wrapper>
      <S.PageHeader>
        <h1>Visão geral</h1>
        <p>
          {monthLabel} · {pluralize(counts.incomes, "receita", "receitas")} e{" "}
          {pluralize(counts.expenses, "gasto", "gastos")}
        </p>
      </S.PageHeader>
      <MagicBento
        items={items}
        columns={4}
        rowHeight={196}
      />
    </S.Wrapper>
  );
};
