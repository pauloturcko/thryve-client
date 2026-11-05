import { FieldErrors, FieldValues } from "react-hook-form";
import { useToastContext } from "@/contexts/ToastContext";

const REQUIRED_FIELDS_MESSAGE = "Preencha os campos obrigatórios.";
const INVALID_FIELDS_MESSAGE = "Revise os campos destacados.";

export const useInvalidFormToast = () => {
  const { dispatchToast } = useToastContext();

  return <T extends FieldValues>(errors: FieldErrors<T>) => {
    const fieldErrors = Object.values(errors).filter(
      (error) => error !== undefined
    );
    const hasEmptyRequired = fieldErrors.some(
      (error) => error.type === "required"
    );
    const firstMessage = fieldErrors.find(
      (error) => typeof error.message === "string"
    )?.message;

    const message = hasEmptyRequired
      ? REQUIRED_FIELDS_MESSAGE
      : typeof firstMessage === "string"
        ? firstMessage
        : INVALID_FIELDS_MESSAGE;

    dispatchToast({ message, type: "error" });
  };
};
