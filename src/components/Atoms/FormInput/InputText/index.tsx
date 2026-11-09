import * as S from "./styles";
import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
import { useTheme } from "styled-components";

type InputTextProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
  error?: string;
};

export const InputText = ({
  label,
  required,
  error,
  ...props
}: InputTextProps) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <S.InputWrapper>
      <S.Label>
        {label}
        {required && <S.RequiredMark>*</S.RequiredMark>}
      </S.Label>
      <S.InputContainer>
        <S.Input
          {...props}
          type={isVisible ? "text" : props.type}
          aria-invalid={!!error || undefined}
          $hasError={!!error}
        />
        {props.type === "password" && (
          <S.ToggleButton
            type="button"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <EyeOff
                color={theme.colors.textMuted}
                size={20}
              />
            ) : (
              <Eye
                color={theme.colors.textMuted}
                size={20}
              />
            )}
          </S.ToggleButton>
        )}
      </S.InputContainer>
    </S.InputWrapper>
  );
};
