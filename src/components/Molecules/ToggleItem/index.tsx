import { Toggle } from "@/components/Atoms/Toggle";
import * as S from "./styles";

type ToggleItemProps = {
  title: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
};

export const ToggleItem = ({
  title,
  description,
  checked,
  onChange,
}: ToggleItemProps) => {
  return (
    <S.ItemWrapper>
      <S.InfoWrapper>
        <p>{title}</p>
        {description && <span>{description}</span>}
      </S.InfoWrapper>
      <Toggle
        checked={checked}
        onChange={onChange}
        label={title}
      />
    </S.ItemWrapper>
  );
};
