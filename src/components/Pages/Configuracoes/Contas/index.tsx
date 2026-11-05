"use client";

import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { SettingsWrapper } from "@/components/Molecules/SettingsWrapper";
import { BankAccountInfo } from "@/components/Organisms/BankAccountInfo";
import { useModalContext } from "@/contexts/ModalContext";
import { useBankAccount } from "@/hooks/useBankAccount";
import { Plus } from "lucide-react";
import { NewBankAccount } from "./FormModal";
import * as S from "./styles";

const BankAccountFormContent = ({ onClose }: { onClose: () => void }) => (
  <NewBankAccount onClose={onClose} />
);

export const ContasPage = () => {
  const { openModal } = useModalContext();
  const { loadAllBankAccounts } = useBankAccount();

  const handleOpenModal = () => {
    openModal({
      component: BankAccountFormContent,
      title: "Nova Conta",
    });
  };

  return (
    <SettingsWrapper
      title="Contas"
      description="Configure suas contas"
      button={
        <SpecularButton
          size="sm"
          onClick={handleOpenModal}
        >
          <Plus size={18} /> Nova Conta
        </SpecularButton>
      }
    >
      <S.AccountsGrid>
        {loadAllBankAccounts.isLoading && <p>Carregando...</p>}
        {loadAllBankAccounts.data?.length === 0 && (
          <p>Nenhuma conta cadastrada.</p>
        )}
        {loadAllBankAccounts.data?.map((bankAccount) => (
          <BankAccountInfo
            key={bankAccount.id}
            bankAccount={bankAccount}
          />
        ))}
      </S.AccountsGrid>
    </SettingsWrapper>
  );
};
