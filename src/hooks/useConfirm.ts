import { createElement } from "react";
import { ConfirmDialog } from "@/components/Molecules/ConfirmDialog";
import { useModalContext } from "@/contexts/ModalContext";

type ConfirmOptions = {
  title?: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
};

export const useConfirm = () => {
  const { openModal } = useModalContext();

  const confirm = ({
    title = "Confirmar ação",
    ...dialogProps
  }: ConfirmOptions) => {
    openModal({
      title,
      render: (close) =>
        createElement(ConfirmDialog, { ...dialogProps, onClose: close }),
    });
  };

  return { confirm };
};
