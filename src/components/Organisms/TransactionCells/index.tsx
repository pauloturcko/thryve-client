import { CircleCheck, Clock } from "lucide-react";
import { createElement } from "react";
import { ItemActions } from "@/components/Atoms/ItemActions";
import { getCategoryIcon } from "@/constants/categoryIcons";
import { Category } from "@/services/category-service";
import * as S from "./styles";
import { Money } from "@/components/Atoms/Money";

// Células compartilhadas pelas tabelas de gastos e de receitas.

export const EMPTY_CELL = "—";

export const TitleCell = ({
  title,
  category,
}: {
  title: string;
  category: Category;
}) => (
  <S.TitleCell>
    <S.IconWrapper $color={category.color}>
      {createElement(getCategoryIcon(category.icon), { size: 16 })}
    </S.IconWrapper>
    <span title={title}>{title}</span>
  </S.TitleCell>
);

type StatusCellProps = {
  isPaid: boolean;
  label: string;
  toggleLabel: string;
  onToggle: () => void;
};

export const StatusCell = ({
  isPaid,
  label,
  toggleLabel,
  onToggle,
}: StatusCellProps) => (
  <S.StatusButton
    type="button"
    $isPaid={isPaid}
    title={toggleLabel}
    onClick={onToggle}
  >
    {isPaid ? <CircleCheck size={13} /> : <Clock size={13} />}
    {label}
  </S.StatusButton>
);

export const AmountCell = ({
  amount,
  variant,
}: {
  amount: number;
  variant: "income" | "expense";
}) => (
  <S.Amount $variant={variant}>
    {variant === "income" ? "+" : "-"} <Money value={amount} />
  </S.Amount>
);

export const ActionsCell = ({
  itemName,
  onEdit,
  onDelete,
}: {
  itemName: string;
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <S.Actions>
    <ItemActions
      itemName={itemName}
      iconSize={32}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  </S.Actions>
);
