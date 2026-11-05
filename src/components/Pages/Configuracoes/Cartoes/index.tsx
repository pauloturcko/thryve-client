"use client";

import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { SettingsWrapper } from "@/components/Molecules/SettingsWrapper";
import { CardInfo } from "@/components/Organisms/CardInfo";
import { useModalContext } from "@/contexts/ModalContext";
import { useCard } from "@/hooks/useCard";
import { Plus } from "lucide-react";
import { NewCard } from "./FormModal";
import * as S from "./styles";

const CardFormContent = ({ onClose }: { onClose: () => void }) => (
  <NewCard onClose={onClose} />
);

export const CartoesPage = () => {
  const { openModal } = useModalContext();
  const { loadAllCards } = useCard();

  const handleOpenModal = () => {
    openModal({
      component: CardFormContent,
      title: "Novo Cartão",
    });
  };

  return (
    <SettingsWrapper
      title="Cartões"
      description="Configure seus cartões"
      button={
        <SpecularButton
          size="sm"
          onClick={handleOpenModal}
        >
          <Plus size={18} /> Novo Cartão
        </SpecularButton>
      }
    >
      <S.CardsGrid>
        {loadAllCards.isLoading && <p>Carregando...</p>}
        {loadAllCards.data?.length === 0 && <p>Nenhum cartão cadastrado.</p>}
        {loadAllCards.data?.map((card) => (
          <CardInfo
            key={card.id}
            card={card}
          />
        ))}
      </S.CardsGrid>
    </SettingsWrapper>
  );
};
