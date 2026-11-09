"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Ref, useId } from "react";
import * as S from "./styles";

type Option = {
  value: string | number;
  label: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  ref?: Ref<HTMLButtonElement>;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  compact?: boolean;
};

const EMPTY_VALUE = "__empty__";
const toRadixValue = (value: string) => (value === "" ? EMPTY_VALUE : value);
const fromRadixValue = (value: string) => (value === EMPTY_VALUE ? "" : value);

export const Select = ({
  label,
  options,
  value = "",
  onChange,
  onBlur,
  ref,
  placeholder = "Selecione",
  required,
  disabled,
  error,
  compact = false,
}: SelectProps) => {
  const triggerId = useId();

  return (
    <S.InputWrapper>
      <S.Label htmlFor={triggerId}>
        {label}
        {required && <S.RequiredMark>*</S.RequiredMark>}
      </S.Label>
      <RadixSelect.Root
        value={toRadixValue(value)}
        onValueChange={(next) => onChange?.(fromRadixValue(next))}
        onOpenChange={(open) => {
          if (!open) onBlur?.();
        }}
        disabled={disabled}
      >
        <S.Trigger
          id={triggerId}
          ref={ref}
          aria-invalid={!!error || undefined}
          $hasError={!!error}
          $compact={compact}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon asChild>
            <ChevronDown size={16} />
          </RadixSelect.Icon>
        </S.Trigger>
        <RadixSelect.Portal>
          <S.Content
            position="popper"
            sideOffset={6}
            collisionPadding={12}
          >
            <S.ScrollButton as={RadixSelect.ScrollUpButton}>
              <ChevronUp size={16} />
            </S.ScrollButton>
            <S.Viewport>
              {options.map((option) => (
                <S.Item
                  key={option.value}
                  value={toRadixValue(String(option.value))}
                >
                  <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                  <S.ItemIndicator>
                    <Check size={16} />
                  </S.ItemIndicator>
                </S.Item>
              ))}
            </S.Viewport>
            <S.ScrollButton as={RadixSelect.ScrollDownButton}>
              <ChevronDown size={16} />
            </S.ScrollButton>
          </S.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </S.InputWrapper>
  );
};
