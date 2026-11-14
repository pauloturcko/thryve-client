import { ChangeEvent } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/Atoms/FormInput";
import { FormWrapper } from "@/components/Atoms/FormWrapper";
import {
  GoalPriority,
  GoalPriorityOptions,
} from "@/constants/enums/goal-priority-enum";
import {
  GoalStatus,
  GoalStatusOptions,
} from "@/constants/enums/goal-status-enum";
import { useGoal } from "@/hooks/useGoal";
import { useInvalidFormToast } from "@/hooks/useInvalidFormToast";
import { Goal } from "@/services/goal-service";
import { formatCurrencyInput } from "@/utils/format";
import { maskCurrency } from "@/utils/masks";
import { parseCurrencyInput } from "@/utils/parse";
import * as S from "./styles";

type GoalFormData = {
  nome: string;
  objetivo: string;
  guardado: string;
  prioridade: number;
  status: number;
  prazo: string;
  observacoes: string;
};

const requiredMessage = "Campo obrigatório";

const withCurrencyMask = (
  field: ReturnType<ReturnType<typeof useForm<GoalFormData>>["register"]>
) => ({
  ...field,
  onChange: (event: ChangeEvent<HTMLInputElement>) => {
    event.target.value = maskCurrency(event.target.value);
    return field.onChange(event);
  },
});

export const NewGoal = ({
  onClose,
  goal,
}: {
  onClose: () => void;
  goal?: Goal;
}) => {
  const { createGoal, updateGoal } = useGoal();
  const isEditMode = !!goal;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalFormData>({
    defaultValues: goal
      ? {
          nome: goal.name,
          objetivo: goal.targetAmount
            ? formatCurrencyInput(Number(goal.targetAmount))
            : "",
          guardado: formatCurrencyInput(Number(goal.savedAmount)),
          prioridade: goal.priority,
          status: goal.status,
          prazo: goal.deadline ?? "",
          observacoes: goal.notes ?? "",
        }
      : {
          nome: "",
          objetivo: "",
          guardado: "",
          prioridade: GoalPriority.Media,
          status: GoalStatus.EmAndamento,
          prazo: "",
          observacoes: "",
        },
  });

  const nome = register("nome", {
    required: requiredMessage,
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
  });
  const objetivo = register("objetivo", {
    validate: (value) =>
      !value ||
      parseCurrencyInput(value) > 0 ||
      "O valor deve ser maior que zero",
  });
  const guardado = register("guardado");
  const prazo = register("prazo");
  const observacoes = register("observacoes", {
    maxLength: { value: 500, message: "Máximo de 500 caracteres" },
  });

  const handleInvalid = useInvalidFormToast();

  const onSubmit: SubmitHandler<GoalFormData> = (data) => {
    const payload = {
      name: data.nome.trim(),
      targetAmount: data.objetivo ? parseCurrencyInput(data.objetivo) : null,
      savedAmount: parseCurrencyInput(data.guardado),
      priority: Number(data.prioridade),
      status: Number(data.status),
      deadline: data.prazo || null,
      notes: data.observacoes.trim() || null,
    };

    if (isEditMode && goal) {
      updateGoal.mutate(
        { id: goal.id, ...payload },
        { onSuccess: () => onClose() }
      );
      return;
    }

    createGoal.mutate(payload, { onSuccess: () => onClose() });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit, handleInvalid)}>
      <FormInput.Text
        label="Nome"
        placeholder="Ex: Reserva de emergência"
        required
        error={errors.nome?.message}
        {...nome}
      />
      <S.Row>
        <FormInput.Text
          label="Valor objetivo"
          placeholder="Opcional"
          inputMode="numeric"
          error={errors.objetivo?.message}
          {...withCurrencyMask(objetivo)}
        />
        <FormInput.Text
          label="Valor guardado"
          placeholder="Ex: 1.500,00"
          inputMode="numeric"
          error={errors.guardado?.message}
          {...withCurrencyMask(guardado)}
        />
      </S.Row>
      <S.Row>
        <Controller
          name="prioridade"
          control={control}
          rules={{ required: requiredMessage }}
          render={({ field }) => (
            <FormInput.Select
              label="Prioridade"
              options={GoalPriorityOptions}
              required
              error={errors.prioridade?.message}
              ref={field.ref}
              value={String(field.value ?? "")}
              onChange={(value) => field.onChange(Number(value))}
              onBlur={field.onBlur}
            />
          )}
        />
        <FormInput.Text
          label="Prazo"
          type="date"
          error={errors.prazo?.message}
          {...prazo}
        />
      </S.Row>
      {isEditMode && (
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormInput.Select
              label="Status"
              options={GoalStatusOptions}
              ref={field.ref}
              value={String(field.value ?? "")}
              onChange={(value) => field.onChange(Number(value))}
              onBlur={field.onBlur}
            />
          )}
        />
      )}
      <FormInput.Text
        label="Observações"
        placeholder="Opcional"
        error={errors.observacoes?.message}
        {...observacoes}
      />
      <S.Actions>
        <Button type="submit">{isEditMode ? "Atualizar" : "Salvar"}</Button>
        <Button
          variant="cancel"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </S.Actions>
    </FormWrapper>
  );
};
