import * as S from "./styles";

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
};

export const Toggle = ({ checked, onChange, label }: ToggleProps) => {
  return (
    <S.Track
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      $checked={checked}
    >
      <S.Thumb $checked={checked} />
    </S.Track>
  );
};
