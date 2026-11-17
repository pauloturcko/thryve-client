"use client";

import { createElement } from "react";
import { Clock, FileText, Landmark } from "lucide-react";
import { ThemeProvider } from "styled-components";
import { IconWrapper } from "@/components/Organisms/TransactionCells/styles";
import { getCategoryIcon } from "@/constants/categoryIcons";
import { buildTheme } from "@/styles/theme";
import { formatCurrency } from "@/utils/format";
import { DemoReviewSource } from "../data";
import * as S from "./styles";

// Mesmo tema do produto, com as cores vivas de status e categorias.
const productTheme = buildTheme("light");

type ReviewPreviewProps = {
  source: DemoReviewSource;
  origin: "file" | "bank";
  footer: string;
};

// Ilustração dos fluxos planejados: a origem é lida, os pré-cadastros são
// listados e o que ainda precisa da pessoa fica marcado. Nada aqui é clicável
// de propósito.
export const ReviewPreview = ({
  source,
  origin,
  footer,
}: ReviewPreviewProps) => {
  const readyCount = source.rows.filter((row) => !row.missing).length;
  const pendingCount = source.rows.length - readyCount;

  return (
    <ThemeProvider theme={productTheme}>
      <S.Window aria-hidden="true">
        <S.File>
          <S.FileIcon $origin={origin}>
            {createElement(origin === "file" ? FileText : Landmark, {
              size: 18,
              strokeWidth: 1.6,
            })}
          </S.FileIcon>
          <S.FileInfo>
            <strong>{source.title}</strong>
            <span>{source.subtitle}</span>
          </S.FileInfo>
          {origin === "bank" && <S.Connected>Conectada</S.Connected>}
          <S.Reading>
            <i />
          </S.Reading>
        </S.File>
        <S.ReviewHeader>
          <span>Pré-cadastros</span>
          <span>
            {readyCount} prontos · {pendingCount} para completar
          </span>
        </S.ReviewHeader>
        <S.Rows>
          {source.rows.map((row, index) => (
            <S.Row
              key={row.id}
              $missing={Boolean(row.missing)}
              style={{ ["--row" as string]: index }}
            >
              <S.RowDate>{row.date}</S.RowDate>
              <IconWrapper $color={row.color}>
                {createElement(getCategoryIcon(row.icon), { size: 16 })}
              </IconWrapper>
              <S.Description>
                <strong>{row.description}</strong>
                {row.missing ? (
                  <S.Missing>Falta: {row.missing.toLowerCase()}</S.Missing>
                ) : (
                  <span>
                    {row.kind === "income" ? "Receita" : "Despesa"} ·{" "}
                    {row.category}
                  </span>
                )}
              </S.Description>
              <S.Value $kind={row.kind}>
                {row.kind === "income" ? "+" : "−"} {formatCurrency(row.amount)}
              </S.Value>
              <S.Flag $missing={Boolean(row.missing)}>
                {row.missing ? "Completar" : "Pronto"}
              </S.Flag>
            </S.Row>
          ))}
        </S.Rows>
        <S.Footer>
          <Clock
            size={14}
            strokeWidth={1.75}
          />
          {footer}
        </S.Footer>
      </S.Window>
    </ThemeProvider>
  );
};
