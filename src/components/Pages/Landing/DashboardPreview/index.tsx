"use client";

import { useTheme } from "styled-components";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  MoneyReceiveSquareIcon,
  MoneySendSquareIcon,
  PieChartIcon,
  SaveMoneyDollarIcon,
  Sun03Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { Avatar } from "@/components/Atoms/Avatar";
import { Logo } from "@/components/Atoms/Logo";
import { MagicBento, MagicBentoItem } from "@/components/Organisms/MagicBento";
import { BalanceChartView } from "@/components/Pages/Dashboard/BalanceChart";
import * as D from "@/components/Pages/Dashboard/styles";
import { formatCurrency } from "@/utils/format";
import {
  demoBalanceSeries,
  demoMonth,
  demoSlices,
  demoUpcoming,
} from "../data";
import * as S from "./styles";

const percent = (value: number) => `${Math.round(value * 100)}%`;

const Delta = ({
  change,
  goodWhenUp,
}: {
  change: number;
  goodWhenUp: boolean;
}) => (
  <D.Delta $tone={change > 0 === goodWhenUp ? "good" : "bad"}>
    {change > 0 ? "▲" : "▼"} {Math.abs(change)}% vs mês anterior
  </D.Delta>
);

export const DashboardPreview = () => {
  const theme = useTheme();
  const monthLabel = demoMonth.label.toLowerCase();

  const items: MagicBentoItem[] = [
    {
      id: "balance",
      colSpan: 2,
      rowSpan: 2,
      background: theme.colors.heroCard,
      content: (
        <>
          <MagicBento.Header>
            <span>Saldo de {monthLabel}</span>
            <MagicBento.IconBadge $color={theme.colors.primaryText}>
              <HugeiconsIcon icon={Wallet01Icon} />
            </MagicBento.IconBadge>
          </MagicBento.Header>
          <D.Hero>
            <MagicBento.Figure $size="xl">
              {formatCurrency(demoMonth.balance)}
            </MagicBento.Figure>
            <MagicBento.Note>
              Receitas menos gastos lançados no mês
            </MagicBento.Note>
          </D.Hero>
          <S.ChartSlot>
            <BalanceChartView
              points={demoBalanceSeries}
              monthLabel={demoMonth.label}
              formatValue={formatCurrency}
            />
          </S.ChartSlot>
          <D.Split>
            <D.SplitBar
              style={{
                flexGrow: demoMonth.incomes,
                background: theme.colors.success,
              }}
            />
            <D.SplitBar
              style={{
                flexGrow: demoMonth.expenses,
                background: theme.colors.danger,
              }}
            />
          </D.Split>
          <D.Legend $columns={2}>
            <D.LegendItem>
              <D.LegendLabel>
                <i style={{ background: theme.colors.success }} />
                <span>Receitas</span>
              </D.LegendLabel>
              <D.LegendValue>{formatCurrency(demoMonth.incomes)}</D.LegendValue>
            </D.LegendItem>
            <D.LegendItem>
              <D.LegendLabel>
                <i style={{ background: theme.colors.danger }} />
                <span>Gastos</span>
              </D.LegendLabel>
              <D.LegendValue>
                {formatCurrency(demoMonth.expenses)}
              </D.LegendValue>
            </D.LegendItem>
          </D.Legend>
        </>
      ),
    },
    {
      id: "incomes",
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
              {formatCurrency(demoMonth.incomes)}
            </MagicBento.Figure>
            <Delta
              change={demoMonth.incomesChange}
              goodWhenUp
            />
          </MagicBento.Footer>
        </>
      ),
    },
    {
      id: "expenses",
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
              {formatCurrency(demoMonth.expenses)}
            </MagicBento.Figure>
            <Delta
              change={demoMonth.expensesChange}
              goodWhenUp={false}
            />
          </MagicBento.Footer>
        </>
      ),
    },
    {
      id: "pending",
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
              {formatCurrency(demoMonth.pending)}
            </MagicBento.Figure>
            <MagicBento.Note>
              {demoMonth.pendingCount} contas pendentes
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
          <D.Ring style={{ ["--value" as string]: demoMonth.savingsRate }}>
            <MagicBento.Figure
              $size="lg"
              $color={theme.colors.accentText}
            >
              {percent(demoMonth.savingsRate)}
            </MagicBento.Figure>
            <MagicBento.Note>da renda ficou com você</MagicBento.Note>
          </D.Ring>
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
          <MagicBento.Footer>
            <D.Stack>
              {demoSlices.map((slice) => (
                <D.StackPart
                  key={slice.id}
                  style={{
                    flexGrow: slice.share,
                    background: slice.color || theme.colors.textMuted,
                  }}
                />
              ))}
            </D.Stack>
            <D.Legend $columns={demoSlices.length}>
              {demoSlices.map((slice) => (
                <D.LegendItem key={slice.id}>
                  <D.LegendLabel>
                    <i
                      style={{
                        background: slice.color || theme.colors.textMuted,
                      }}
                    />
                    <span>{slice.name}</span>
                  </D.LegendLabel>
                  <D.LegendValue>
                    {formatCurrency(slice.total)}
                    <small>{percent(slice.share)}</small>
                  </D.LegendValue>
                </D.LegendItem>
              ))}
            </D.Legend>
          </MagicBento.Footer>
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
            <D.HeaderNote>{demoMonth.expenseCount} gastos no mês</D.HeaderNote>
          </MagicBento.Header>
          <D.Upcoming>
            {demoUpcoming.map((expense) => (
              <li key={expense.id}>
                <D.DueDate>
                  <strong>{expense.day}</strong>
                  <span>{expense.month}</span>
                </D.DueDate>
                <D.DueInfo>
                  <span>{expense.description}</span>
                  <small>{expense.category}</small>
                </D.DueInfo>
                <D.DueAmount>{formatCurrency(expense.amount)}</D.DueAmount>
              </li>
            ))}
          </D.Upcoming>
        </>
      ),
    },
  ];

  return (
    <S.Window>
      <S.TopBar>
        <Logo height={30} />
        <S.TopActions>
          <S.ThemeButton>
            <HugeiconsIcon
              icon={Sun03Icon}
              size={18}
              strokeWidth={1.7}
            />
          </S.ThemeButton>
          <S.UserChip>
            <S.Hello>
              <span>Boa tarde,</span>
              <strong>Ana</strong>
            </S.Hello>
            <Avatar
              name="Ana Lima"
              size="2.5rem"
            />
          </S.UserChip>
        </S.TopActions>
      </S.TopBar>
      <S.PageHeader>
        <strong>Visão geral</strong>
        <span>
          {demoMonth.label} · {demoMonth.incomeCount} receitas e{" "}
          {demoMonth.expenseCount} gastos
        </span>
      </S.PageHeader>
      <MagicBento
        items={items}
        columns={4}
        rowHeight={196}
        enableSpotlight={false}
        enableBorderGlow={false}
        clickEffect={false}
        intro={false}
      />
    </S.Window>
  );
};
