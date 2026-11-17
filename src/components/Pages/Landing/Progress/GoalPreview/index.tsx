"use client";

import { useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import * as E from "@/components/Molecules/EntityDetails/styles";
import { formatDateBR } from "@/utils/date";
import { formatCurrency } from "@/utils/format";
import { DemoGoal, demoGoals } from "../../data";
import * as S from "./styles";

const MILESTONES = [0.25, 0.5, 0.75];
const PRIORITY = ["baixa", "média", "alta"];

const progressOf = (goal: DemoGoal) =>
  Math.min(1, goal.savedAmount / goal.targetAmount);

const percent = (value: number) => `${Math.round(value * 100)}%`;

export const GoalPreview = () => {
  const [selectedId, setSelectedId] = useState(demoGoals[0].id);
  const goal = demoGoals.find((item) => item.id === selectedId) ?? demoGoals[0];
  const progress = progressOf(goal);
  const remaining = Math.max(0, goal.targetAmount - goal.savedAmount);

  return (
    <S.Layout>
      <S.List aria-label="Metas de exemplo">
        {demoGoals.map((item) => {
          const itemProgress = progressOf(item);
          return (
            <S.GoalWrapper
              key={item.id}
              type="button"
              aria-pressed={item.id === goal.id}
              $selected={item.id === goal.id}
              onClick={() => setSelectedId(item.id)}
            >
              <S.GoalHeader>
                <p>{item.name}</p>
              </S.GoalHeader>
              <S.GoalInfoWrapper>
                <S.Meta>Prioridade {PRIORITY[item.priority]}</S.Meta>
                <S.Saved>
                  {formatCurrency(item.savedAmount)}
                  <small> de {formatCurrency(item.targetAmount)}</small>
                </S.Saved>
                <S.CardProgress>
                  <S.CardTrack aria-hidden="true">
                    <S.CardFill
                      style={{ transform: `scaleX(${itemProgress})` }}
                    />
                  </S.CardTrack>
                  <span>{percent(itemProgress)}</span>
                </S.CardProgress>
              </S.GoalInfoWrapper>
            </S.GoalWrapper>
          );
        })}
      </S.List>

      <S.Details aria-live="polite">
        <E.Header>
          <E.Heading>
            <h3>{goal.name}</h3>
            <p>Em andamento · Prioridade {PRIORITY[goal.priority]}</p>
          </E.Heading>
          <S.StaticActions aria-hidden="true">
            <E.ActionButton as="span">
              <SquarePen size={16} /> Editar
            </E.ActionButton>
            <E.ActionButton
              as="span"
              $danger
            >
              <Trash2 size={16} /> Excluir
            </E.ActionButton>
          </S.StaticActions>
        </E.Header>
        <E.Stats>
          <E.Stat $negative={false}>
            <span>Guardado</span>
            <strong>{formatCurrency(goal.savedAmount)}</strong>
          </E.Stat>
          <E.Stat $negative={false}>
            <span>Objetivo</span>
            <strong>{formatCurrency(goal.targetAmount)}</strong>
          </E.Stat>
          <E.Stat $negative={false}>
            <span>Falta</span>
            <strong>{formatCurrency(remaining)}</strong>
          </E.Stat>
        </E.Stats>
        <E.Section>
          <E.SectionTitle>Progresso</E.SectionTitle>
          <S.Progress>
            <S.ProgressHeader>
              <strong>{percent(progress)}</strong>
              <span>{formatCurrency(remaining)} para chegar lá</span>
            </S.ProgressHeader>
            <S.Track
              role="img"
              aria-label={`${percent(progress)} da meta concluída`}
            >
              <S.Fill style={{ transform: `scaleX(${progress})` }} />
              {MILESTONES.map((milestone) => (
                <S.Milestone
                  key={milestone}
                  $reached={progress >= milestone}
                  style={{ left: `${milestone * 100}%` }}
                />
              ))}
            </S.Track>
          </S.Progress>
        </E.Section>
        <E.Section>
          <E.SectionTitle>Detalhes</E.SectionTitle>
          <S.Facts>
            <div>
              <dt>Prazo</dt>
              <dd>{formatDateBR(goal.deadline)}</dd>
            </div>
            <div>
              <dt>Observações</dt>
              <dd>{goal.notes}</dd>
            </div>
          </S.Facts>
        </E.Section>
      </S.Details>
    </S.Layout>
  );
};
