import { Button } from "@/components/Atoms/Button";
import { FormInput } from "@/components/Atoms/FormInput";
import { FormWrapper } from "@/components/Atoms/FormWrapper";
import { categoryColors } from "@/constants/categoryColors";
import { CategoryIconOptions } from "@/constants/categoryIcons";
import {
  CategoryType,
  CategoryTypeOptions,
} from "@/constants/enums/category-type-enum";
import { useCategory } from "@/hooks/useCategory";
import { Category } from "@/services/category-service";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import * as S from "./styles";

type NewCategoryFormData = {
  nome: string;
  tipo: number;
  icone: string;
  cor: string;
};

const requiredMessage = "Campo obrigatório";

export const NewCategory = ({
  onClose,
  category,
}: {
  onClose: () => void;
  category?: Category;
}) => {
  const { createCategory, updateCategory } = useCategory();
  const isEditMode = !!category;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewCategoryFormData>({
    defaultValues: category
      ? {
          nome: category.name,
          tipo: category.type,
          icone: category.icon,
          cor: category.color,
        }
      : {
          tipo: CategoryType.Despesa,
          icone: "tag",
          cor: "#6a00f4",
        },
  });

  const nome = register("nome", {
    required: requiredMessage,
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
  });
  const tipo = register("tipo", { required: requiredMessage });
  const cor = useWatch({ control, name: "cor" });

  const onSubmit: SubmitHandler<NewCategoryFormData> = (data) => {
    const payload = {
      name: data.nome,
      type: Number(data.tipo),
      icon: data.icone,
      color: data.cor,
    };

    if (isEditMode && category) {
      updateCategory.mutate(
        { id: category.id, ...payload },
        { onSuccess: () => onClose() }
      );
      return;
    }

    createCategory.mutate(payload, { onSuccess: () => onClose() });
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <FormInput.Text
        label="Nome"
        placeholder="Ex: Alimentação"
        required
        error={errors.nome?.message}
        {...nome}
      />
      <FormInput.Select
        label="Tipo"
        options={CategoryTypeOptions}
        required
        error={errors.tipo?.message}
        {...tipo}
      />
      <Controller
        name="icone"
        control={control}
        rules={{ required: requiredMessage }}
        render={({ field }) => (
          <FormInput.Icon
            label="Ícone"
            options={CategoryIconOptions}
            color={cor}
            required
            error={errors.icone?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name="cor"
        control={control}
        rules={{ required: requiredMessage }}
        render={({ field }) => (
          <FormInput.Color
            label="Cor"
            colors={categoryColors}
            required
            error={errors.cor?.message}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <S.Actions>
        <Button
          type="submit"
          rounded="0.5rem"
          height="2.5rem"
          color="textPrimary"
          width="100%"
        >
          {isEditMode ? "Atualizar" : "Salvar"}
        </Button>
        <Button
          type="button"
          onClick={onClose}
          rounded="0.5rem"
          height="2.5rem"
          border
          hover="danger"
          background="transparent"
          color="textPrimary"
          width="100%"
        >
          Cancelar
        </Button>
      </S.Actions>
    </FormWrapper>
  );
};
