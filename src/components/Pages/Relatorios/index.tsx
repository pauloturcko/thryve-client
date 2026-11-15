"use client";

import { Check, FileDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { FormInput } from "@/components/Atoms/FormInput";
import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { Toggle } from "@/components/Atoms/Toggle";
import { PageWrapper } from "@/components/Molecules/PageWrapper";
import { CategoryType } from "@/constants/enums/category-type-enum";
import {
  ReportSection,
  ReportSectionDescriptions,
  ReportSectionOptions,
} from "@/constants/enums/report-section-enum";
import { useBankAccount } from "@/hooks/useBankAccount";
import { useCard } from "@/hooks/useCard";
import { useCategory } from "@/hooks/useCategory";
import { useReport, useReportPreview } from "@/hooks/useReport";
import { ReportConfig } from "@/services/relatorios/ReportService/types";
import { getErrorMessage } from "@/utils/get-error-message";
import { PeriodPreset, periodOptions, presetRange } from "./period";
import { ReportHistory } from "./ReportHistory";
import { ReportPreview } from "./ReportPreview";
import * as S from "./styles";

const PREVIEW_DEBOUNCE_MS = 700;

const useDebouncedValue = <T,>(value: T, delay: number) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

const timezone =
  typeof Intl !== "undefined"
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : "America/Sao_Paulo";

const dataSections = [
  ReportSection.Rendas,
  ReportSection.Gastos,
  ReportSection.Investimentos,
];

export const RelatoriosPage = () => {
  const { loadAllBankAccounts } = useBankAccount();
  const { loadAllCards } = useCard();
  const { loadAllCategories } = useCategory();
  const { generateReport } = useReport();

  const [preset, setPreset] = useState<PeriodPreset>("month");
  const [customRange, setCustomRange] = useState(() => presetRange("month"));
  const [sections, setSections] = useState<ReportSection[]>([
    ReportSection.VisaoGeral,
    ReportSection.Rendas,
    ReportSection.Gastos,
    ReportSection.Investimentos,
  ]);
  const [bankAccountIds, setBankAccountIds] = useState<number[]>([]);
  const [cardIds, setCardIds] = useState<number[]>([]);
  const [categoryIds, setCategoryIds] = useState<number[]>([]);
  const [includeTransactions, setIncludeTransactions] = useState(true);
  const [title, setTitle] = useState("");

  const range = preset === "custom" ? customRange : presetRange(preset);
  const invalidRange =
    !range.startDate || !range.endDate || range.endDate < range.startDate;

  const chosenData = sections.filter((section) =>
    dataSections.includes(section)
  );
  const covered = chosenData.length > 0 ? chosenData : dataSections;
  const showsExpenses = covered.includes(ReportSection.Gastos);
  const showsIncomes = covered.includes(ReportSection.Rendas);

  const cardOptions = showsExpenses
    ? (loadAllCards.data ?? []).map((card) => ({
        value: card.id,
        label: `${card.name} •••• ${card.lastFourDigits}`,
      }))
    : [];
  const categoryOptions = (loadAllCategories.data ?? [])
    .filter(
      (category) =>
        (showsIncomes && category.type === CategoryType.Receita) ||
        (showsExpenses && category.type === CategoryType.Despesa)
    )
    .map((category) => ({
      value: category.id,
      label: category.name,
    }));
  const accountOptions = (loadAllBankAccounts.data ?? []).map((account) => ({
    value: account.id,
    label: account.name,
  }));

  const visibleCardIds = cardIds.filter((id) =>
    cardOptions.some((option) => option.value === id)
  );
  const visibleCategoryIds = categoryIds.filter((id) =>
    categoryOptions.some((option) => option.value === id)
  );

  const blockedReason =
    sections.length === 0
      ? "Escolha pelo menos uma seção para montar o relatório."
      : invalidRange
        ? "Informe um período válido: a data final precisa ser igual ou posterior à inicial."
        : null;

  const config: ReportConfig | null = blockedReason
    ? null
    : {
        title: title.trim() || null,
        startDate: range.startDate,
        endDate: range.endDate,
        sections,
        bankAccountIds,
        cardIds: visibleCardIds,
        categoryIds: visibleCategoryIds,
        includeTransactions,
        timezone,
      };

  const configKey = config ? JSON.stringify(config) : null;
  const debouncedKey = useDebouncedValue(configKey, PREVIEW_DEBOUNCE_MS);
  const previewConfig = useMemo<ReportConfig | null>(
    () => (debouncedKey ? JSON.parse(debouncedKey) : null),
    [debouncedKey]
  );
  const preview = useReportPreview(previewConfig);

  const toggleSection = (section: ReportSection) =>
    setSections((current) =>
      current.includes(section)
        ? current.filter((item) => item !== section)
        : [...current, section].sort()
    );

  const handlePreset = (value: string) => {
    const next = value as PeriodPreset;
    if (next === "custom" && preset !== "custom") setCustomRange(range);
    setPreset(next);
  };

  return (
    <PageWrapper
      title="Relatórios"
      description="Monte um relatório, confira a prévia e baixe em PDF"
      action={
        <SpecularButton
          size="sm"
          aria-disabled={!config || generateReport.isPending}
          onClick={() => {
            if (config && !generateReport.isPending)
              generateReport.mutate(config);
          }}
        >
          <FileDown size={18} /> Gerar PDF
        </SpecularButton>
      }
    >
      <S.Layout>
        <S.Builder aria-label="Configurar relatório">
          <S.Group>
            <S.GroupTitle>Período</S.GroupTitle>
            <FormInput.Select
              label="Intervalo"
              options={periodOptions}
              value={preset}
              onChange={handlePreset}
            />
            {preset === "custom" ? (
              <S.DateRow>
                <FormInput.Text
                  label="De"
                  aria-label="Data inicial"
                  type="date"
                  value={customRange.startDate}
                  onChange={(event) =>
                    setCustomRange((current) => ({
                      ...current,
                      startDate: event.target.value,
                    }))
                  }
                />
                <FormInput.Text
                  label="Até"
                  aria-label="Data final"
                  type="date"
                  value={customRange.endDate}
                  error={invalidRange ? "Período inválido" : undefined}
                  onChange={(event) =>
                    setCustomRange((current) => ({
                      ...current,
                      endDate: event.target.value,
                    }))
                  }
                />
              </S.DateRow>
            ) : (
              <S.Hint>
                {range.startDate.split("-").reverse().join("/")} a{" "}
                {range.endDate.split("-").reverse().join("/")}
              </S.Hint>
            )}
          </S.Group>

          <S.Divider />

          <S.Group>
            <S.GroupTitle>O que incluir</S.GroupTitle>
            <S.SectionList>
              {ReportSectionOptions.map((option) => {
                const checked = sections.includes(option.value);
                return (
                  <S.SectionOption
                    key={option.value}
                    type="button"
                    role="checkbox"
                    aria-checked={checked}
                    $checked={checked}
                    onClick={() => toggleSection(option.value)}
                  >
                    <S.Check $checked={checked}>
                      {checked && (
                        <Check
                          size={14}
                          strokeWidth={3}
                        />
                      )}
                    </S.Check>
                    <div>
                      <strong>{option.label}</strong>
                      <span>{ReportSectionDescriptions[option.value]}</span>
                    </div>
                  </S.SectionOption>
                );
              })}
            </S.SectionList>
            {sections.length === 0 && (
              <S.Hint $tone="danger">Escolha pelo menos uma seção.</S.Hint>
            )}
          </S.Group>

          <S.Divider />

          <S.Group>
            <S.GroupTitle>Filtros</S.GroupTitle>
            <FormInput.MultiSelect
              label="Contas"
              placeholder="Todas as contas"
              options={accountOptions}
              value={bankAccountIds}
              onChange={setBankAccountIds}
            />
            <FormInput.MultiSelect
              label="Cartões"
              placeholder="Todos os cartões"
              options={cardOptions}
              value={visibleCardIds}
              onChange={setCardIds}
            />
            <FormInput.MultiSelect
              label="Categorias"
              placeholder="Todas as categorias"
              options={categoryOptions}
              value={visibleCategoryIds}
              onChange={setCategoryIds}
            />
            {showsExpenses && cardOptions.length > 0 && (
              <S.Hint>Cartões filtram só os gastos.</S.Hint>
            )}
          </S.Group>

          <S.Divider />

          <S.Group>
            <S.GroupTitle>Opções</S.GroupTitle>
            <FormInput.Text
              label="Título"
              placeholder="Automático, ex: Novembro de 2026"
              maxLength={120}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <S.SectionOption
              as="div"
              $checked={false}
              style={{ cursor: "default" }}
            >
              <div style={{ flex: 1 }}>
                <strong>Lista de lançamentos</strong>
                <span>Sem ela, o PDF traz só totais e gráficos</span>
              </div>
              <Toggle
                checked={includeTransactions}
                onChange={() => setIncludeTransactions((value) => !value)}
                label="Incluir lista de lançamentos"
              />
            </S.SectionOption>
          </S.Group>
        </S.Builder>

        <S.Side>
          <S.SideContent>
            <ReportPreview
              url={preview.url}
              isFetching={preview.isFetching}
              error={
                preview.error
                  ? getErrorMessage(
                      preview.error,
                      "Não foi possível gerar a prévia."
                    )
                  : null
              }
              blockedReason={blockedReason}
            />
            <ReportHistory />
          </S.SideContent>
        </S.Side>
      </S.Layout>
    </PageWrapper>
  );
};
