import { demoInstallments } from "../../data";
import { TransactionPreview } from "./TransactionPreview";
import * as S from "./styles";

export const InstallmentsSpecimen = () => (
  <S.List>
    {demoInstallments.map((installment) => (
      <TransactionPreview
        key={installment.id}
        transaction={installment}
      />
    ))}
  </S.List>
);
