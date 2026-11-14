"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { SpecularButton } from "@/components/Atoms/SpecularButton";
import { SplitSettingsView } from "@/components/Molecules/SplitSettingsView";
import { GoalInfo } from "@/components/Organisms/GoalInfo";
import { GoalStatus } from "@/constants/enums/goal-status-enum";
import { useModalContext } from "@/contexts/ModalContext";
import { useConfirm } from "@/hooks/useConfirm";
import { useGoal } from "@/hooks/useGoal";
import { Goal } from "@/services/goal-service";
import { GoalDetails } from "./GoalDetails";
import { NewGoal } from "./FormModal";

export const MetasPage = () => {
  const { openModal } = useModalContext();
  const { confirmSteps } = useConfirm();
  const { loadAllGoals, deleteGoal, updateGoal } = useGoal();
  const [selectedGoalId, setSelectedGoalId] = useState<number | null>(null);

  const goals = loadAllGoals.data ?? [];
  const selectedGoal =
    goals.find((goal) => goal.id === selectedGoalId) ?? goals[0];

  const handleCreate = () => {
    openModal({
      title: "Nova Meta",
      render: (close) => <NewGoal onClose={close} />,
    });
  };

  const handleEdit = (goal: Goal) => {
    openModal({
      title: "Editar Meta",
      render: (close) => (
        <NewGoal
          onClose={close}
          goal={goal}
        />
      ),
    });
  };

  const handleDelete = (goal: Goal) => {
    confirmSteps(
      [
        {
          title: "Excluir meta",
          message: `Tem certeza que deseja excluir a meta "${goal.name}"? Esta ação não é reversível.`,
          confirmLabel: "Excluir meta",
          danger: true,
        },
      ],
      () => deleteGoal.mutate({ id: goal.id })
    );
  };

  const handleComplete = (goal: Goal) => {
    updateGoal.mutate({ id: goal.id, status: GoalStatus.Concluida });
  };

  const listMessage = loadAllGoals.isLoading
    ? "Carregando..."
    : !selectedGoal
      ? "Nenhuma meta cadastrada."
      : undefined;

  return (
    <SplitSettingsView
      title="Metas"
      description="Configure suas metas"
      message={listMessage}
      action={
        <SpecularButton
          size="sm"
          onClick={handleCreate}
        >
          <Plus size={18} /> Nova Meta
        </SpecularButton>
      }
      list={goals.map((goal) => (
        <GoalInfo
          key={goal.id}
          goal={goal}
          selected={goal.id === selectedGoal?.id}
          onSelect={() => setSelectedGoalId(goal.id)}
        />
      ))}
      details={
        selectedGoal && (
          <GoalDetails
            goal={selectedGoal}
            onEdit={() => handleEdit(selectedGoal)}
            onDelete={() => handleDelete(selectedGoal)}
            onComplete={() => handleComplete(selectedGoal)}
          />
        )
      }
    />
  );
};
