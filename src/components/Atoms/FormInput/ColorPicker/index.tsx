import { Check, Plus } from "lucide-react";
import { useState } from "react";
import * as S from "./styles";

type ColorPickerProps = {
  label: string;
  colors: string[];
  value?: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
};

export const ColorPicker = ({
  label,
  colors,
  value = "",
  onChange,
  required,
  error,
}: ColorPickerProps) => {
  const [isCustom, setIsCustom] = useState(
    !!value && !colors.includes(value.toLowerCase())
  );

  const handleSelect = (color: string) => {
    setIsCustom(false);
    onChange(color);
  };

  return (
    <S.InputWrapper>
      <S.Label>
        {label}
        {required && <S.RequiredMark>*</S.RequiredMark>}
      </S.Label>
      <S.SwatchGrid
        role="radiogroup"
        aria-label={label}
      >
        {colors.map((color) => {
          const isSelected = !isCustom && color === value.toLowerCase();

          return (
            <S.Swatch
              key={color}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={color}
              title={color}
              onClick={() => handleSelect(color)}
              $color={color}
              $selected={isSelected}
            >
              {isSelected && <Check size={16} />}
            </S.Swatch>
          );
        })}
        <S.CustomSwatch
          type="button"
          role="radio"
          aria-checked={isCustom}
          aria-label="Cor personalizada"
          title="Cor personalizada"
          onClick={() => setIsCustom(true)}
          $selected={isCustom}
        >
          <Plus size={16} />
        </S.CustomSwatch>
      </S.SwatchGrid>
      {isCustom && (
        <S.CustomInput
          type="color"
          aria-label="Escolher cor personalizada"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          $hasError={!!error}
        />
      )}
    </S.InputWrapper>
  );
};
