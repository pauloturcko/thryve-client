"use client";

import { useTheme } from "styled-components";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  MoneyReceiveSquareIcon,
  MoneySendSquareIcon,
  PieChartIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { MagicBento, MagicBentoItem } from "@/components/Organisms/MagicBento";
import { BalanceChartView } from "@/components/Pages/Dashboard/BalanceChart";
import * as D from "@/components/Pages/Dashboard/styles";
import { formatCurrency } from "@/utils/format";
import { demoBalanceSeries, demoMonth, demoSlices } from "../../data";

const percent = (value: number) => `${Math.round(value * 100)}%`;

export const DashboardSpecimen = () => {
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
          <BalanceChartView
            points={demoBalanceSeries}
            monthLabel={demoMonth.label}
            formatValue={formatCurrency}
          />
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
            <MagicBento.Figure $size="md">
              {formatCurrency(demoMonth.incomes)}
            </MagicBento.Figure>
            <D.Delta $tone="good">
              ▲ {demoMonth.incomesChange}% vs mês anterior
            </D.Delta>
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
            <MagicBento.Figure $size="md">
              {formatCurrency(demoMonth.expenses)}
            </MagicBento.Figure>
            <D.Delta $tone="good">
              ▼ {Math.abs(demoMonth.expensesChange)}% vs mês anterior
            </D.Delta>
          </MagicBento.Footer>
        </>
      ),
    },
    {
      id: "categories",
      colSpan: 3,
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
                  <D.LegendValue>{percent(slice.share)}</D.LegendValue>
                </D.LegendItem>
              ))}
            </D.Legend>
          </MagicBento.Footer>
        </>
      ),
    },
  ];

  return (
    <MagicBento
      items={items}
      columns={3}
      rowHeight={150}
      clickEffect={false}
      intro={false}
    />
  );
};
