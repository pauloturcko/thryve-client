"use client";
import { MonthNavigator } from "@/components/Molecules/MonthNavigator";
import { SimpleCard } from "@/components/Organisms/SimpleCard";
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
        {summary.map((item) => (
          <SimpleCard
            key={item.title}
            title={item.title}
            icon={item.icon}
            value={item.value}
            description={item.description}
            valueColor={item.color}
          />
        ))}
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
