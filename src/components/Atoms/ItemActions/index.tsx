import { SquarePen, Trash2 } from "lucide-react";
import * as S from "./styles";

type ItemActionsProps = {
  itemName: string;
  onEdit: () => void;
  onDelete: () => void;
  iconSize?: number;
};

export const ItemActions = ({
  itemName,
  onEdit,
  onDelete,
  iconSize = 28,
}: ItemActionsProps) => (
  <S.Actions>
    <S.ActionButton
      type="button"
      aria-label={`Editar ${itemName}`}
      onClick={onEdit}
    >
      <SquarePen size={iconSize} />
    </S.ActionButton>
    <S.ActionButton
      type="button"
      aria-label={`Excluir ${itemName}`}
      $danger
      onClick={onDelete}
    >
      <Trash2 size={iconSize} />
    </S.ActionButton>
  </S.Actions>
);
