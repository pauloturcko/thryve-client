import { createElement } from "react";
import { ConfirmDialog } from "@/components/Molecules/ConfirmDialog";
import { useModalContext } from "@/contexts/ModalContext";

type ConfirmStep = Omit<ConfirmOptions, "onConfirm">;

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

  const confirmSteps = (steps: ConfirmStep[], onConfirm: () => void) => {
    const [step, ...nextSteps] = steps;
    if (!step) return onConfirm();

    confirm({
      ...step,
      onConfirm: () => confirmSteps(nextSteps, onConfirm),
    });
  };

  return { confirm, confirmSteps };
};
