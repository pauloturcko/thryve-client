import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/Atoms/FormInput";
import { FormWrapper } from "@/components/Atoms/FormWrapper";
import {
  InvestmentMovementType,
  InvestmentMovementTypeOptions,
} from "@/constants/enums/investment-movement-type-enum";
import { useInvalidFormToast } from "@/hooks/useInvalidFormToast";
import { useInvestment } from "@/hooks/useInvestment";
import {
  Investment,
  InvestmentMovement,
} from "@/services/investimentos/InvestmentService/types";
import { todayISO } from "@/utils/date";
import { formatCurrencyInput } from "@/utils/format";
import { parseCurrencyInput } from "@/utils/parse";
import { withCurrencyMask } from "../FormModal";
import * as S from "../FormModal/styles";

type MovementFormData = {
  tipo: number;
  sentido: "gain" | "loss";
  valor: string;
  data: string;
  observacoes: string;
};

const requiredMessage = "Campo obrigatório";

const directionOptions = [
  { value: "gain", label: "Ganho" },
  { value: "loss", label: "Perda" },
];

type MovementModalProps = {
  onClose: () => void;
  investment: Investment;
  movement?: InvestmentMovement;
  initialType?: InvestmentMovementType;
};

export const MovementModal = ({
  onClose,
  investment,
  movement,
  initialType = InvestmentMovementType.Aporte,
}: MovementModalProps) => {
  const { createMovement, updateMovement } = useInvestment();
  const isEditMode = !!movement;
  const accountName = investment.bankAccount?.name ?? "conta vinculada";

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MovementFormData>({
    defaultValues: movement
      ? {
          tipo: movement.type,
          sentido: Number(movement.amount) < 0 ? "loss" : "gain",
          valor: formatCurrencyInput(Math.abs(Number(movement.amount))),
          data: movement.date,
          observacoes: movement.notes ?? "",
        }
      : {
          tipo: initialType,
          sentido: "gain",
          valor: "",
          data: todayISO(),
          observacoes: "",
        },
  });

  const type = Number(useWatch({ control, name: "tipo" }));

  const valor = register("valor", {
    validate: (value) =>
      parseCurrencyInput(value) > 0 || "Informe um valor maior que zero",
  });
  const data = register("data", { required: requiredMessage });
  const observacoes = register("observacoes", {
    maxLength: { value: 500, message: "Máximo de 500 caracteres" },
  });

  const handleInvalid = useInvalidFormToast();

  const hint = {
    [InvestmentMovementType.Aporte]: `O valor sai do saldo de ${accountName}.`,
    [InvestmentMovementType.Resgate]: `O valor volta para o saldo de ${accountName}.`,
    [InvestmentMovementType.Rendimento]:
      "Rendimentos não mexem no saldo da conta, só no valor do investimento.",
  }[type as InvestmentMovementType];

  const onSubmit: SubmitHandler<MovementFormData> = (formData) => {
    const amount = parseCurrencyInput(formData.valor);
    const signed =
      Number(formData.tipo) === InvestmentMovementType.Rendimento &&
      formData.sentido === "loss"
        ? -amount
        : amount;
    const payload = {
      type: Number(formData.tipo),
      amount: signed,
      date: formData.data,
      notes: formData.observacoes.trim() || null,
    };

    if (isEditMode && movement) {
      updateMovement.mutate(
        { id: movement.id, ...payload },
        { onSuccess: () => onClose() }
      );
      return;
    }

    createMovement.mutate(
      { investmentId: investment.id, ...payload },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit, handleInvalid)}>
      <S.Row>
        <Controller
          name="tipo"
          control={control}
          render={({ field }) => (
            <FormInput.Select
              label="Tipo"
              options={InvestmentMovementTypeOptions}
              required
              ref={field.ref}
              value={String(field.value)}
              onChange={(value) => field.onChange(Number(value))}
              onBlur={field.onBlur}
            />
          )}
        />
        {type === InvestmentMovementType.Rendimento && (
          <Controller
            name="sentido"
            control={control}
            render={({ field }) => (
              <FormInput.Select
                label="Resultado"
                options={directionOptions}
                ref={field.ref}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
        )}
      </S.Row>
      <S.Hint>{hint}</S.Hint>
      <S.Row>
        <FormInput.Text
          label="Valor"
          placeholder="Ex: 500,00"
          inputMode="numeric"
          required
          error={errors.valor?.message}
          {...withCurrencyMask(valor)}
        />
        <FormInput.Text
          label="Data"
          type="date"
          required
          error={errors.data?.message}
          {...data}
        />
      </S.Row>
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
