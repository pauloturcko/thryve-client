"use client";
import { RubberSegment } from "@/components/Atoms/RubberSegment";
import { MonthNavigator } from "@/components/Molecules/MonthNavigator";
import { MagicBento } from "@/components/Organisms/MagicBento";
import { Inbox, List, Table2 } from "lucide-react";
import { ReactNode, useState } from "react";
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
  table: ReactNode;
  children: ReactNode;
};

// A lista é a visão padrão; a tabela fica disponível pelo seletor.
type ListView = "table" | "list";

const viewItems = [
  {
    value: "list",
    label: (
      <S.ViewLabel>
        <List size={15} /> Lista
      </S.ViewLabel>
    ),
  },
  {
    value: "table",
    label: (
      <S.ViewLabel>
        <Table2 size={15} /> Tabela
      </S.ViewLabel>
    ),
  },
];

export const TransactionsBoard = ({
  month,
  onMonthChange,
  filters,
  summary,
  listTitle,
  count,
  isLoading,
  emptyMessage,
  table,
  children,
}: TransactionsBoardProps) => {
  const [view, setView] = useState<ListView>("list");

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
        <S.SectionHeader>
          <S.SectionTitle>
            {listTitle} <span>{count}</span>
          </S.SectionTitle>
          <RubberSegment
            aria-label="Modo de exibição"
            items={viewItems}
            value={view}
            onChange={(value) => setView(value as ListView)}
          />
        </S.SectionHeader>
        {isLoading && <p>Carregando...</p>}
        {!isLoading && view === "table" && table}
        {!isLoading && view === "list" && count === 0 && (
          <S.EmptyState>
            <Inbox size={28} />
            <p>{emptyMessage}</p>
          </S.EmptyState>
        )}
        {view === "list" && <S.List>{children}</S.List>}
      </S.Section>
    </>
  );
};
