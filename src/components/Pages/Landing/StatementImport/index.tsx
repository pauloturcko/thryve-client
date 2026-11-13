"use client";

import { Clock, FileText } from "lucide-react";
import { formatCurrency } from "@/utils/format";
import { demoStatement } from "../data";
import * as S from "./styles";

const readyCount = demoStatement.rows.filter((row) => !row.missing).length;
const pendingCount = demoStatement.rows.length - readyCount;

// Ilustração do fluxo planejado: arquivo lido, pré-cadastros listados e o que
// ainda precisa da pessoa. Nada aqui é clicável de propósito.
export const StatementImport = () => (
  <S.Window aria-hidden="true">
    <S.File>
      <S.FileIcon>
        <FileText
          size={18}
          strokeWidth={1.6}
        />
      </S.FileIcon>
      <S.FileInfo>
        <strong>{demoStatement.title}</strong>
        <span>
          {demoStatement.period} · {demoStatement.rows.length} transações
          encontradas
        </span>
      </S.FileInfo>
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
      {demoStatement.rows.map((row, index) => (
        <S.Row
          key={row.id}
          $missing={Boolean(row.missing)}
          style={{ ["--row" as string]: index }}
        >
          <S.RowDate>{row.date}</S.RowDate>
          <S.Description>
            <strong>{row.description}</strong>
            {row.missing ? (
              <S.Missing>Falta: {row.missing.toLowerCase()}</S.Missing>
            ) : (
              <span>
                {row.kind === "income" ? "Receita" : "Despesa"} · {row.category}
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
      Nada é salvo antes da sua confirmação.
    </S.Footer>
  </S.Window>
);
