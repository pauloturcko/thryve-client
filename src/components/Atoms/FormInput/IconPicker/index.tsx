import { LucideIcon } from "lucide-react";
import { createElement } from "react";
import * as S from "./styles";

type IconOption = {
  value: string;
  label: string;
  icon: LucideIcon;
};

type IconPickerProps = {
  label: string;
  options: IconOption[];
  value?: string;
  onChange: (value: string) => void;
  color?: string;
  required?: boolean;
  error?: string;
};

export const IconPicker = ({
  label,
  options,
  value,
  onChange,
  color,
  required,
  error,
}: IconPickerProps) => {
  return (
    <S.InputWrapper>
      <S.Label $hasError={!!error}>
        {label}
        {required && <S.RequiredMark>*</S.RequiredMark>}
      </S.Label>
      <S.IconGrid
        role="radiogroup"
        aria-label={label}
        aria-invalid={!!error || undefined}
      >
        {options.map((option) => (
          <S.IconOption
            key={option.value}
            type="button"
            role="radio"
            aria-checked={option.value === value}
            aria-label={option.label}
            title={option.label}
            onClick={() => onChange(option.value)}
            $selected={option.value === value}
            $color={color}
          >
            {createElement(option.icon, { size: 20 })}
          </S.IconOption>
        ))}
      </S.IconGrid>
    </S.InputWrapper>
  );
};
