"use client";

import { RubberSegment } from "@/components/Atoms/RubberSegment";
import { FieldLabel, FieldWrapper } from "./styles";

type Option = { value: string | number; label: string };

type SegmentProps = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const Segment = ({ label, options, value, onChange }: SegmentProps) => (
  <FieldWrapper data-segment="">
    <FieldLabel>{label}</FieldLabel>
    <RubberSegment
      aria-label={label}
      value={value}
      onChange={onChange}
      items={options.map((option) => ({
        value: String(option.value),
        label: option.label,
      }))}
    />
  </FieldWrapper>
);
