"use client";

import { Button } from "@/components/Atoms/Button";
import * as S from "./styles";

type ConfirmDialogProps = {
  onClose: () => void;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
};

export const ConfirmDialog = ({
  onClose,
  message,
  onConfirm,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  danger = false,
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <S.Wrapper>
      <p>{message}</p>
      <S.Actions>
        <Button
          variant={danger ? "danger" : "confirm"}
          onClick={handleConfirm}
        >
          {confirmLabel}
        </Button>
        <Button
          variant="cancel"
          onClick={onClose}
        >
          {cancelLabel}
        </Button>
      </S.Actions>
    </S.Wrapper>
  );
};
