"use client";

import { Plus } from "lucide-react";
import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { SettingsPanel } from "@/components/Molecules/SettingsPanel";
import { BankAccountInfo } from "@/components/Organisms/BankAccountInfo";
import { useModalContext } from "@/contexts/ModalContext";
import { useBankAccount } from "@/hooks/useBankAccount";
import { useConfirm } from "@/hooks/useConfirm";
import { BankAccount } from "@/services/bank-account-service";
import { NewBankAccount } from "./FormModal";
import * as S from "./styles";

export const ContasPage = () => {
  const { openModal } = useModalContext();
  const { confirm } = useConfirm();
  const { loadAllBankAccounts, deleteBankAccount } = useBankAccount();

  const handleCreate = () => {
    openModal({
      title: "Nova Conta",
      render: (close) => <NewBankAccount onClose={close} />,
    });
  };

  const handleEdit = (bankAccount: BankAccount) => {
    openModal({
      title: "Editar Conta",
      render: (close) => (
        <NewBankAccount
          onClose={close}
          bankAccount={bankAccount}
        />
      ),
    });
  };

  const handleDelete = (bankAccount: BankAccount) => {
    confirm({
      title: "Excluir conta",
      message: `Tem certeza que deseja excluir a conta "${bankAccount.name}"? Essa ação não pode ser desfeita.`,
      confirmLabel: "Excluir",
      danger: true,
      onConfirm: () => deleteBankAccount.mutate({ id: bankAccount.id }),
    });
  };

  return (
    <SettingsPanel
      title="Contas"
      description="Configure suas contas"
      action={
        <SpecularButton
          size="sm"
          onClick={handleCreate}
        >
          <Plus size={18} /> Nova Conta
        </SpecularButton>
      }
    >
      <S.AccountsList>
        {loadAllBankAccounts.isLoading && <S.Message>Carregando...</S.Message>}
        {loadAllBankAccounts.data?.length === 0 && (
          <S.Message>Nenhuma conta cadastrada.</S.Message>
        )}
        {loadAllBankAccounts.data?.map((bankAccount) => (
          <BankAccountInfo
            key={bankAccount.id}
            bankAccount={bankAccount}
            onEdit={() => handleEdit(bankAccount)}
            onDelete={() => handleDelete(bankAccount)}
          />
        ))}
      </S.AccountsList>
    </SettingsPanel>
  );
};
