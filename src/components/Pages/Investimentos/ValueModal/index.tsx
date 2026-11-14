import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/Atoms/FormInput";
import { FormWrapper } from "@/components/Atoms/FormWrapper";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";
import { useInvalidFormToast } from "@/hooks/useInvalidFormToast";
import { useInvestment } from "@/hooks/useInvestment";
import { Investment } from "@/services/investimentos/InvestmentService/types";
import { todayISO } from "@/utils/date";
import { maskCurrency } from "@/utils/masks";
import { parseCurrencyInput } from "@/utils/parse";
import { withCurrencyMask } from "../FormModal";
import * as S from "../FormModal/styles";

type ValueFormData = {
  valor: string;
  data: string;
  observacoes: string;
};

export const ValueModal = ({
  onClose,
  investment,
}: {
  onClose: () => void;
  investment: Investment;
}) => {
  const formatCurrency = useFormatCurrency();
  const { updateValue } = useInvestment();
  const current = Number(investment.currentAmount);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValueFormData>({
    defaultValues: { valor: "", data: todayISO(), observacoes: "" },
  });

  const valor = register("valor", {
    validate: (value) => {
      if (!maskCurrency(value)) return "Informe o valor atual";
      return (
        parseCurrencyInput(value) !== current ||
        "O valor é igual ao valor atual do investimento"
      );
    },
  });
  const data = register("data", { required: "Campo obrigatório" });
  const observacoes = register("observacoes", {
    maxLength: { value: 500, message: "Máximo de 500 caracteres" },
  });

  const handleInvalid = useInvalidFormToast();

  const onSubmit: SubmitHandler<ValueFormData> = (formData) => {
    updateValue.mutate(
      {
        investmentId: investment.id,
        currentAmount: parseCurrencyInput(formData.valor),
        date: formData.data,
        notes: formData.observacoes.trim() || null,
      },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit, handleInvalid)}>
      <S.Hint style={{ marginTop: 0 }}>
        Hoje a Thryve registra {formatCurrency(current)} neste investimento.
        Informe o valor que aparece no seu banco ou corretora: a diferença entra
        como rendimento (ou perda) na data escolhida.
      </S.Hint>
      <S.Row>
        <FormInput.Text
          label="Valor atual"
          placeholder="Ex: 5.230,45"
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
        <Button type="submit">Atualizar valor</Button>
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
