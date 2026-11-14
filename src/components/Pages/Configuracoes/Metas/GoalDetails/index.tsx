import {
  EntityDetailsHeader,
  EntityDetailsSection,
  EntityDetailsStats,
} from "@/components/Molecules/EntityDetails";
import {
  GoalPriority,
  GoalPriorityLabels,
} from "@/constants/enums/goal-priority-enum";
import {
  GoalStatus,
  GoalStatusLabels,
} from "@/constants/enums/goal-status-enum";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { Goal } from "@/services/goal-service";
import { formatDateBR, todayISO } from "@/utils/date";
import { formatPercent, goalProgress } from "@/utils/goal";
import * as S from "./styles";

const MILESTONES = [0.25, 0.5, 0.75];
const EMPTY = "—";

type GoalDetailsProps = {
  goal: Goal;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
};

export const GoalDetails = ({
  goal,
  onEdit,
  onDelete,
  onComplete,
}: GoalDetailsProps) => {
  const formatCurrency = useFormatCurrency();
  const saved = Number(goal.savedAmount);
  const target = goal.targetAmount ? Number(goal.targetAmount) : null;
  const progress = goalProgress(goal);
  const status = goal.status as GoalStatus;
  const remaining = target !== null ? Math.max(0, target - saved) : null;
  const overdue =
    status === GoalStatus.EmAndamento &&
    !!goal.deadline &&
    goal.deadline < todayISO();

  return (
    <>
      <EntityDetailsHeader
        title={goal.name}
        subtitle={`${GoalStatusLabels[status]} · Prioridade ${GoalPriorityLabels[
          goal.priority as GoalPriority
        ].toLowerCase()}`}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <EntityDetailsStats
        stats={[
          { label: "Guardado", value: formatCurrency(saved) },
          {
            label: "Objetivo",
            value:
              target !== null ? formatCurrency(target) : "Sem valor definido",
          },
          {
            label: "Falta",
            value: remaining !== null ? formatCurrency(remaining) : EMPTY,
          },
        ]}
      />
      <EntityDetailsSection title="Progresso">
        {progress === null ? (
          <S.Message>
            Defina um valor objetivo para acompanhar o progresso desta meta.
          </S.Message>
        ) : (
          <S.Progress>
            <S.ProgressHeader>
              <strong>{formatPercent(progress)}</strong>
              <span>
                {progress >= 1
                  ? "Objetivo alcançado"
                  : `${formatCurrency(remaining ?? 0)} para chegar lá`}
              </span>
            </S.ProgressHeader>
            <S.Track
              role="img"
              aria-label={`${formatPercent(progress)} da meta concluída`}
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
        )}
        {status === GoalStatus.EmAndamento &&
          progress !== null &&
          progress >= 1 && (
            <S.CompleteButton
              type="button"
              onClick={onComplete}
            >
              Marcar como concluída
            </S.CompleteButton>
          )}
      </EntityDetailsSection>
      <EntityDetailsSection title="Detalhes">
        <S.Details>
          <div>
            <dt>Prazo</dt>
            <dd>
              {goal.deadline ? formatDateBR(goal.deadline) : EMPTY}
              {overdue && <S.Overdue>Prazo vencido</S.Overdue>}
            </dd>
          </div>
          {goal.completedAt && (
            <div>
              <dt>Concluída em</dt>
              <dd>{formatDateBR(goal.completedAt)}</dd>
            </div>
          )}
          <div>
            <dt>Observações</dt>
            <dd>{goal.notes || EMPTY}</dd>
          </div>
        </S.Details>
      </EntityDetailsSection>
    </>
  );
};
