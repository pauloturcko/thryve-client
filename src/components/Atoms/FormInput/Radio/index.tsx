"use client";

import { JellyRadio } from "@/components/Atoms/JellyRadio";
import { RequiredMark } from "../Select/styles";
import { FieldError, FieldLabel, FieldWrapper } from "./styles";

type Option = { value: string | number; label: string };

type RadioProps = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
};

export const Radio = ({ label, options, value, onChange, required, error }: RadioProps) => (
  <FieldWrapper>
    <FieldLabel as="span">
      {label}
      {required && <RequiredMark>*</RequiredMark>}
    </FieldLabel>
    <JellyRadio
      ariaLabel={label}
      value={value}
      onChange={onChange}
      items={options.map((option) => ({
        value: String(option.value),
        label: option.label,
      }))}
    />
    {error && <FieldError role="alert">{error}</FieldError>}
  </FieldWrapper>
);
