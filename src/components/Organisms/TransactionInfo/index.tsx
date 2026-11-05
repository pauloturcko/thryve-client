"use client";
import { ItemActions } from "@/components/Atoms/ItemActions";
import { getCategoryIcon } from "@/constants/categoryIcons";
import { Category } from "@/services/category-service";
import { formatCurrencyBRL } from "@/utils/format";
import { CircleCheck, Clock } from "lucide-react";
import { createElement } from "react";
import * as S from "./styles";

type TransactionInfoProps = {
  title: string;
  details: (string | null | undefined)[];
  category: Category;
  amount: number;
  variant: "income" | "expense";
  isPaid: boolean;
  statusLabel: string;
  toggleStatusLabel: string;
  onToggleStatus: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const TransactionInfo = ({
  title,
  details,
  category,
  amount,
  variant,
  isPaid,
  statusLabel,
  toggleStatusLabel,
  onToggleStatus,
  onEdit,
  onDelete,
}: TransactionInfoProps) => {
  const signal = variant === "income" ? "+" : "-";

  return (
    <S.TransactionWrapper>
      <S.IconWrapper $color={category.color}>
        {createElement(getCategoryIcon(category.icon), { size: 22 })}
      </S.IconWrapper>
      <S.Info>
        <S.Title>{title}</S.Title>
        <S.Details>{details.filter(Boolean).join(" • ")}</S.Details>
      </S.Info>
      <S.Footer>
        <S.StatusButton
          type="button"
          $isPaid={isPaid}
          title={toggleStatusLabel}
          onClick={onToggleStatus}
        >
          {isPaid ? <CircleCheck size={14} /> : <Clock size={14} />}
          {statusLabel}
        </S.StatusButton>
        <S.Amount $variant={variant}>
          {signal} {formatCurrencyBRL(amount)}
        </S.Amount>
      </S.Footer>
      <S.Actions>
        <ItemActions
          itemName={title}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </S.Actions>
    </S.TransactionWrapper>
  );
};
