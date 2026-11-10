import Image, { StaticImageData } from "next/image";
import mastercard from "@/assets/mastercard.svg";
import visa from "@/assets/visa.svg";
import { ItemActions } from "@/components/Atoms/ItemActions";
import { CardFlag } from "@/constants/enums/card-flag-enum";
import { CardType, CardTypeLabels } from "@/constants/enums/card-type-enum";
import { Card } from "@/services/card-service";
import { formatCurrencyBRL, formatExpiryDate } from "@/utils/format";
import * as S from "./styles";

const flagIcons: Partial<Record<number, StaticImageData>> = {
  [CardFlag.Visa]: visa,
  [CardFlag.Mastercard]: mastercard,
};

type CardInfoProps = {
  card: Card;
  onEdit: () => void;
  onDelete: () => void;
};

export const CardInfo = ({ card, onEdit, onDelete }: CardInfoProps) => {
  const flagIcon = flagIcons[card.cardFlag];

  return (
    <S.CardWrapper>
      <S.CardHeader>
        <p>{card.name}</p>
        <ItemActions
          itemName={card.name}
          iconSize={30}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </S.CardHeader>
      <S.CardInfoWrapper>
        <S.InfoRow>
          <S.CardLastFourDigits>
            **** **** **** {card.lastFourDigits}
          </S.CardLastFourDigits>
          {flagIcon && (
            <Image
              src={flagIcon}
              alt="Bandeira do cartão"
              width={40}
              height={35}
            />
          )}
        </S.InfoRow>
        <S.InfoRow>
          <p>Tipo</p>
          <span>{CardTypeLabels[card.cardType as CardType]}</span>
        </S.InfoRow>
        <S.InfoRow>
          <p>Validade</p>
          <span>{formatExpiryDate(card.expiresIn)}</span>
        </S.InfoRow>
        {card.limit !== null && (
          <S.InfoRow>
            <p>Limite</p>
            <span>{formatCurrencyBRL(Number(card.limit))}</span>
          </S.InfoRow>
        )}
      </S.CardInfoWrapper>
    </S.CardWrapper>
  );
};
