"use client";
import { MonthNavigator } from "@/components/Molecules/MonthNavigator";
import { MagicBento } from "@/components/Organisms/MagicBento";
import { Inbox } from "lucide-react";
import { ReactNode } from "react";
import * as S from "./styles";

export type SummaryItem = {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  color?: string;
};

type TransactionsBoardProps = {
  month: string;
  onMonthChange: (month: string) => void;
  filters: ReactNode;
  summary: SummaryItem[];
  listTitle: string;
  count: number;
  isLoading: boolean;
  emptyMessage: string;
  children: ReactNode;
};

export const TransactionsBoard = ({
  month,
  onMonthChange,
  filters,
  summary,
  listTitle,
  count,
  isLoading,
  emptyMessage,
  children,
}: TransactionsBoardProps) => {
  return (
    <>
      <S.Toolbar>
        <MonthNavigator
          month={month}
          onChange={onMonthChange}
        />
        <S.Filters>{filters}</S.Filters>
      </S.Toolbar>
      <S.SummaryGrid>
        <MagicBento
          columns={3}
          rowHeight={150}
          radius={20}
          intro={false}
          items={summary.map((item) => ({
            id: item.title,
            content: (
              <>
                <MagicBento.Header>
                  <span>{item.title}</span>
                  <MagicBento.IconBadge>{item.icon}</MagicBento.IconBadge>
                </MagicBento.Header>
                <MagicBento.Footer>
                  <MagicBento.Figure
                    $size="lg"
                    $color={item.color}
                  >
                    {item.value}
                  </MagicBento.Figure>
                  <MagicBento.Note>{item.description}</MagicBento.Note>
                </MagicBento.Footer>
              </>
            ),
          }))}
        />
      </S.SummaryGrid>
      <S.Section>
        <S.SectionTitle>
          {listTitle} <span>{count}</span>
        </S.SectionTitle>
        {isLoading && <p>Carregando...</p>}
        {!isLoading && count === 0 && (
          <S.EmptyState>
            <Inbox size={28} />
            <p>{emptyMessage}</p>
          </S.EmptyState>
        )}
        <S.List>{children}</S.List>
      </S.Section>
    </>
  );
};
