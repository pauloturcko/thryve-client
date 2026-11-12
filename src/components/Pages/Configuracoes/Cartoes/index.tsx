"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { SplitSettingsView } from "@/components/Molecules/SplitSettingsView";
import { CardInfo } from "@/components/Organisms/CardInfo";
import { useModalContext } from "@/contexts/ModalContext";
import { useCard } from "@/hooks/useCard";
import { useConfirm } from "@/hooks/useConfirm";
import { useExpensesList } from "@/hooks/useExpense";
import { Card } from "@/services/card-service";
import { CardDetails } from "./CardDetails";
import { NewCard } from "./FormModal";

export const CartoesPage = () => {
  const { openModal } = useModalContext();
  const { confirmSteps } = useConfirm();
  const { loadAllCards, deleteCard } = useCard();
  const loadExpenses = useExpensesList();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const cards = loadAllCards.data ?? [];
  const selectedCard =
    cards.find((card) => card.id === selectedCardId) ?? cards[0];
  const selectedCardExpenses = (loadExpenses.data ?? []).filter(
    (expense) => expense.cardId === selectedCard?.id
  );

  const handleCreate = () => {
    openModal({
      title: "Novo Cartão",
      render: (close) => <NewCard onClose={close} />,
    });
  };

  const handleEdit = (card: Card) => {
    openModal({
      title: "Editar Cartão",
      render: (close) => (
        <NewCard
          onClose={close}
          card={card}
        />
      ),
    });
  };

  const handleDelete = (card: Card) => {
    confirmSteps(
      [
        {
          title: "Excluir cartão",
          message: `Ao excluir o cartão "${card.name}", todas as transações vinculadas a ele também serão excluídas.`,
          confirmLabel: "Estou ciente, prosseguir",
          danger: true,
        },
        {
          title: "Confirmar exclusão",
          message: `Tem certeza que deseja excluir definitivamente o cartão "${card.name}" e suas transações? Esta ação não é reversível.`,
          confirmLabel: "Excluir cartão",
          danger: true,
        },
      ],
      () => deleteCard.mutate({ id: card.id })
    );
  };

  const listMessage = loadAllCards.isLoading
    ? "Carregando..."
    : !selectedCard
      ? "Nenhum cartão cadastrado."
      : undefined;

  return (
    <SplitSettingsView
      title="Cartões"
      description="Configure seus cartões"
      message={listMessage}
      action={
        <SpecularButton
          size="sm"
          onClick={handleCreate}
        >
          <Plus size={18} /> Novo Cartão
        </SpecularButton>
      }
      list={cards.map((card) => (
        <CardInfo
          key={card.id}
          card={card}
          selected={card.id === selectedCard?.id}
          onSelect={() => setSelectedCardId(card.id)}
        />
      ))}
      details={
        selectedCard && (
          <CardDetails
            card={selectedCard}
            expenses={selectedCardExpenses}
            isLoading={loadExpenses.isLoading}
            onEdit={() => handleEdit(selectedCard)}
            onDelete={() => handleDelete(selectedCard)}
          />
        )
      }
    />
  );
};
