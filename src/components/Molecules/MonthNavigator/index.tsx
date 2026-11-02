import { formatMonthLabel, shiftMonth } from "@/utils/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as S from "./styles";

type MonthNavigatorProps = {
  month: string;
  onChange: (month: string) => void;
};

export const MonthNavigator = ({ month, onChange }: MonthNavigatorProps) => {
  return (
    <S.Wrapper>
      <S.NavButton
        type="button"
        aria-label="Mês anterior"
        onClick={() => onChange(shiftMonth(month, -1))}
      >
        <ChevronLeft size={18} />
      </S.NavButton>
      <S.Label>{formatMonthLabel(month)}</S.Label>
      <S.NavButton
        type="button"
        aria-label="Próximo mês"
        onClick={() => onChange(shiftMonth(month, 1))}
      >
        <ChevronRight size={18} />
      </S.NavButton>
    </S.Wrapper>
  );
};
