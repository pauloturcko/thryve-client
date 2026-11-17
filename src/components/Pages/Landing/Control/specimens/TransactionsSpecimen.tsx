import { demoTransactions } from "../../data";
import { TransactionPreview } from "./TransactionPreview";
import * as S from "./styles";

export const TransactionsSpecimen = () => (
  <S.List>
    {demoTransactions.slice(0, 3).map((transaction) => (
      <TransactionPreview
        key={transaction.id}
        transaction={transaction}
      />
    ))}
  </S.List>
);
