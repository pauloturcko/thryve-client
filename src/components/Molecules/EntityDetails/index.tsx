import { SquarePen, Trash2 } from "lucide-react";
import { ReactNode } from "react";
import * as S from "./styles";

type EntityDetailsHeaderProps = {
  title: string;
  subtitle?: ReactNode;
  onEdit: () => void;
  onDelete: () => void;
};

export const EntityDetailsHeader = ({
  title,
  subtitle,
  onEdit,
  onDelete,
}: EntityDetailsHeaderProps) => (
  <S.Header>
    <S.Heading>
      <h3>{title}</h3>
      {subtitle && <p>{subtitle}</p>}
    </S.Heading>
    <S.Actions>
      <S.ActionButton
        type="button"
        onClick={onEdit}
      >
        <SquarePen size={16} /> Editar
      </S.ActionButton>
      <S.ActionButton
        type="button"
        $danger
        onClick={onDelete}
      >
        <Trash2 size={16} /> Excluir
      </S.ActionButton>
    </S.Actions>
  </S.Header>
);

type EntityStat = {
  label: string;
  value: string;
  negative?: boolean;
};

export const EntityDetailsStats = ({ stats }: { stats: EntityStat[] }) => (
  <S.Stats>
    {stats.map(({ label, value, negative = false }) => (
      <S.Stat
        key={label}
        $negative={negative}
      >
        <span>{label}</span>
        <strong>{value}</strong>
      </S.Stat>
    ))}
  </S.Stats>
);

type EntityDetailsSectionProps = {
  title: string;
  isLoading?: boolean;
  children: ReactNode;
};

export const EntityDetailsSection = ({
  title,
  isLoading = false,
  children,
}: EntityDetailsSectionProps) => (
  <S.Section>
    <S.SectionTitle>{title}</S.SectionTitle>
    {isLoading ? <S.Message>Carregando...</S.Message> : children}
  </S.Section>
);

export const TransactionDescription = S.Description;
