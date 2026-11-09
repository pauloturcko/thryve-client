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
import { useInvalidFormToast } from "@/hooks/useInvalidFormToast";

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
          cor: "#3b82f6",
        },
  });

  const nome = register("nome", {
    required: requiredMessage,
    minLength: { value: 3, message: "Mínimo de 3 caracteres" },
  });
  const cor = useWatch({ control, name: "cor" });

  const handleInvalid = useInvalidFormToast();

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
    <FormWrapper onSubmit={handleSubmit(onSubmit, handleInvalid)}>
      <FormInput.Text
        label="Nome"
        placeholder="Ex: Alimentação"
        required
        error={errors.nome?.message}
        {...nome}
      />
      <Controller
        name="tipo"
        control={control}
        rules={{ required: requiredMessage }}
        render={({ field }) => (
          <FormInput.Select
            label="Tipo"
            options={CategoryTypeOptions}
            required
            error={errors.tipo?.message}
            ref={field.ref}
            value={String(field.value ?? "")}
            onChange={(value) => field.onChange(Number(value))}
            onBlur={field.onBlur}
          />
        )}
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
