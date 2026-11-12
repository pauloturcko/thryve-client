"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { SplitSettingsView } from "@/components/Molecules/SplitSettingsView";
import { BankAccountInfo } from "@/components/Organisms/BankAccountInfo";
import { useModalContext } from "@/contexts/ModalContext";
import { useBankAccount } from "@/hooks/useBankAccount";
import { useConfirm } from "@/hooks/useConfirm";
import { useExpensesList } from "@/hooks/useExpense";
import { useIncomesList } from "@/hooks/useIncome";
import { BankAccount } from "@/services/bank-account-service";
import { AccountDetails } from "./AccountDetails";
import { NewBankAccount } from "./FormModal";

export const ContasPage = () => {
  const { openModal } = useModalContext();
  const { confirmSteps } = useConfirm();
  const { loadAllBankAccounts, deleteBankAccount } = useBankAccount();
  const loadExpenses = useExpensesList();
  const loadIncomes = useIncomesList();
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );

  const bankAccounts = loadAllBankAccounts.data ?? [];
  const selectedAccount =
    bankAccounts.find((account) => account.id === selectedAccountId) ??
    bankAccounts[0];
  const belongsToSelected = (item: { bankAccountId: number | null }) =>
    item.bankAccountId === selectedAccount?.id;

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
    confirmSteps(
      [
        {
          title: "Excluir conta",
          message: `Ao excluir a conta "${bankAccount.name}", todas as transações vinculadas a ela também serão excluídas.`,
          confirmLabel: "Estou ciente, prosseguir",
          danger: true,
        },
        {
          title: "Confirmar exclusão",
          message: `Tem certeza que deseja excluir definitivamente a conta "${bankAccount.name}" e suas transações? Esta ação não é reversível.`,
          confirmLabel: "Excluir conta",
          danger: true,
        },
      ],
      () => deleteBankAccount.mutate({ id: bankAccount.id })
    );
  };

  const listMessage = loadAllBankAccounts.isLoading
    ? "Carregando..."
    : !selectedAccount
      ? "Nenhuma conta cadastrada."
      : undefined;

  return (
    <SplitSettingsView
      title="Contas"
      description="Configure suas contas"
      message={listMessage}
      action={
        <SpecularButton
          size="sm"
          onClick={handleCreate}
        >
          <Plus size={18} /> Nova Conta
        </SpecularButton>
      }
      list={bankAccounts.map((bankAccount) => (
        <BankAccountInfo
          key={bankAccount.id}
          bankAccount={bankAccount}
          selected={bankAccount.id === selectedAccount?.id}
          onSelect={() => setSelectedAccountId(bankAccount.id)}
        />
      ))}
      details={
        selectedAccount && (
          <AccountDetails
            bankAccount={selectedAccount}
            expenses={(loadExpenses.data ?? []).filter(belongsToSelected)}
            incomes={(loadIncomes.data ?? []).filter(belongsToSelected)}
            isLoading={loadExpenses.isLoading || loadIncomes.isLoading}
            onEdit={() => handleEdit(selectedAccount)}
            onDelete={() => handleDelete(selectedAccount)}
          />
        )
      }
    />
  );
};
