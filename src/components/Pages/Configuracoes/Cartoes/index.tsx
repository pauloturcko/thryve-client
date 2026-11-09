"use client";

import { Plus } from "lucide-react";
import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { SettingsPanel } from "@/components/Molecules/SettingsPanel";
import { CardInfo } from "@/components/Organisms/CardInfo";
import { useModalContext } from "@/contexts/ModalContext";
import { useCard } from "@/hooks/useCard";
import { useConfirm } from "@/hooks/useConfirm";
import { Card } from "@/services/card-service";
import { NewCard } from "./FormModal";
import * as S from "./styles";

export const CartoesPage = () => {
  const { openModal } = useModalContext();
  const { confirm } = useConfirm();
  const { loadAllCards, deleteCard } = useCard();

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
    confirm({
      title: "Excluir cartão",
      message: `Tem certeza que deseja excluir o cartão "${card.name}"? Essa ação não pode ser desfeita.`,
      confirmLabel: "Excluir",
      danger: true,
      onConfirm: () => deleteCard.mutate({ id: card.id }),
    });
  };

  return (
    <SettingsPanel
      title="Cartões"
      description="Configure seus cartões"
      action={
        <SpecularButton
          size="sm"
          onClick={handleCreate}
        >
          <Plus size={18} /> Novo Cartão
        </SpecularButton>
      }
    >
      <S.CardsList>
        {loadAllCards.isLoading && <S.Message>Carregando...</S.Message>}
        {loadAllCards.data?.length === 0 && (
          <S.Message>Nenhum cartão cadastrado.</S.Message>
        )}
        {loadAllCards.data?.map((card) => (
          <CardInfo
            key={card.id}
            card={card}
            onEdit={() => handleEdit(card)}
            onDelete={() => handleDelete(card)}
          />
        ))}
      </S.CardsList>
    </SettingsPanel>
  );
};
