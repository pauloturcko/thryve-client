"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { BaseModal } from "@/components/Molecules/BaseModal";

type ModalConfig = {
  title: string;
  render: (close: () => void) => ReactNode;
};

type ModalContextType = {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  const openModal = (config: ModalConfig) => setModalConfig(config);
  const closeModal = () => setModalConfig(null);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalConfig && (
        <BaseModal
          title={modalConfig.title}
          onClose={closeModal}
        >
          {modalConfig.render(closeModal)}
        </BaseModal>
      )}
    </ModalContext.Provider>
  );
};

export function useModalContext(): ModalContextType {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error(
      "useModalContext() precisa ser usado dentro de <ModalProvider>"
    );
  }
  return context;
}
