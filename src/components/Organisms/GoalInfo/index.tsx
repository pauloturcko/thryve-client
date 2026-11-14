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
import { formatPercent, goalProgress } from "@/utils/goal";
import * as S from "./styles";

type GoalInfoProps = {
  goal: Goal;
  selected?: boolean;
  onSelect: () => void;
};

export const GoalInfo = ({
  goal,
  selected = false,
  onSelect,
}: GoalInfoProps) => {
  const formatCurrency = useFormatCurrency();
  const progress = goalProgress(goal);
  const status = goal.status as GoalStatus;

  return (
    <S.GoalWrapper
      type="button"
      aria-pressed={selected}
      $selected={selected}
      onClick={onSelect}
    >
      <S.GoalHeader>
        <p>{goal.name}</p>
        {status !== GoalStatus.EmAndamento && (
          <S.Status $status={status}>{GoalStatusLabels[status]}</S.Status>
        )}
      </S.GoalHeader>
      <S.GoalInfoWrapper>
        <S.Meta>
          Prioridade{" "}
          {GoalPriorityLabels[goal.priority as GoalPriority].toLowerCase()}
        </S.Meta>
        <S.Saved>
          {formatCurrency(Number(goal.savedAmount))}
          {goal.targetAmount && (
            <small> de {formatCurrency(Number(goal.targetAmount))}</small>
          )}
        </S.Saved>
        {progress !== null && (
          <S.Progress>
            <S.Track aria-hidden="true">
              <S.Fill style={{ transform: `scaleX(${progress})` }} />
            </S.Track>
            <span>{formatPercent(progress)}</span>
          </S.Progress>
        )}
      </S.GoalInfoWrapper>
    </S.GoalWrapper>
  );
};
