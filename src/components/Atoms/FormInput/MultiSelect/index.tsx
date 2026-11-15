"use client";

import { Check, ChevronDown } from "lucide-react";
import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import * as S from "./styles";

type Option = {
  value: number;
  label: string;
};

type MultiSelectProps = {
  label: string;
  options: Option[];
  value: number[];
  onChange: (value: number[]) => void;
  placeholder?: string;
};

const summarize = (options: Option[], value: number[], placeholder: string) => {
  const labels = options
    .filter((option) => value.includes(option.value))
    .map((option) => option.label);

  if (labels.length === 0) return placeholder;
  if (labels.length <= 2) return labels.join(", ");
  return `${labels.length} selecionados`;
};

export const MultiSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Todos",
}: MultiSelectProps) => {
  const id = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!open) return;

    listRef.current?.focus();
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const toggle = (optionValue: number) =>
    onChange(
      value.includes(optionValue)
        ? value.filter((item) => item !== optionValue)
        : [...value, optionValue]
    );

  const openList = () => {
    setActiveIndex(0);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      openList();
    }
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const last = options.length - 1;
    const moves: Record<string, () => number> = {
      ArrowDown: () => Math.min(activeIndex + 1, last),
      ArrowUp: () => Math.max(activeIndex - 1, 0),
      Home: () => 0,
      End: () => last,
    };

    if (moves[event.key]) {
      event.preventDefault();
      setActiveIndex(moves[event.key]());
    } else if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      const option = options[activeIndex];
      if (option) toggle(option.value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  };

  if (options.length === 0) return null;

  const listId = `${id}-list`;

  return (
    <S.InputWrapper
      ref={wrapperRef}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node | null))
          setOpen(false);
      }}
    >
      <S.Label id={`${id}-label`}>{label}</S.Label>
      <S.Trigger
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${id}-label ${id}-value`}
        $open={open}
        $empty={value.length === 0}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleTriggerKeyDown}
      >
        <span id={`${id}-value`}>{summarize(options, value, placeholder)}</span>
        <ChevronDown size={16} />
      </S.Trigger>
      {open && (
        <S.Content>
          <S.List
            ref={listRef}
            id={listId}
            role="listbox"
            aria-multiselectable="true"
            aria-labelledby={`${id}-label`}
            aria-activedescendant={`${id}-option-${activeIndex}`}
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
          >
            {options.map((option, index) => {
              const checked = value.includes(option.value);
              return (
                <S.Item
                  key={option.value}
                  id={`${id}-option-${index}`}
                  data-index={index}
                  role="option"
                  aria-selected={checked}
                  $active={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => toggle(option.value)}
                >
                  <S.Checkbox
                    $checked={checked}
                    aria-hidden="true"
                  >
                    {checked && (
                      <Check
                        size={12}
                        strokeWidth={3}
                      />
                    )}
                  </S.Checkbox>
                  <span>{option.label}</span>
                </S.Item>
              );
            })}
          </S.List>
          <S.Footer>
            <span>
              {value.length === 0
                ? "Nenhum marcado = todos"
                : `${value.length} de ${options.length}`}
            </span>
            {value.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  onChange([]);
                  listRef.current?.focus();
                }}
              >
                Limpar
              </button>
            )}
          </S.Footer>
        </S.Content>
      )}
    </S.InputWrapper>
  );
};
