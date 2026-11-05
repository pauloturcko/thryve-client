"use client";

import { useId } from "react";
import { RubberSegment } from "@/components/Atoms/RubberSegment";
import { FieldLabel, FieldWrapper } from "../Radio/styles";

type Option = { value: string | number; label: string };

type SegmentProps = {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
};

export const Segment = ({ label, options, value, onChange, size = "md" }: SegmentProps) => {
  const labelId = useId();

  return (
    <FieldWrapper
      $inline
      data-segment=""
    >
      <FieldLabel id={labelId}>{label}</FieldLabel>
      <RubberSegment
        aria-label={label}
        size={size}
        value={value}
        onChange={onChange}
        items={options.map((option) => ({
          value: String(option.value),
          label: option.label,
        }))}
      />
    </FieldWrapper>
  );
};
