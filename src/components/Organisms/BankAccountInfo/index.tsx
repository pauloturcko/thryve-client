import { ItemActions } from "@/components/Atoms/ItemActions";
import {
  AccountType,
  AccountTypeLabels,
} from "@/constants/enums/account-type-enum";
import { BankAccount } from "@/services/bank-account-service";
import { formatCurrencyBRL } from "@/utils/format";
import * as S from "./styles";

type BankAccountInfoProps = {
  bankAccount: BankAccount;
  onEdit: () => void;
  onDelete: () => void;
};

export const BankAccountInfo = ({
  bankAccount,
  onEdit,
  onDelete,
}: BankAccountInfoProps) => {
  const balance = Number(bankAccount.balance);

  return (
    <S.AccountWrapper>
      <S.AccountHeader>
        <p>{bankAccount.name}</p>
        <ItemActions
          itemName={bankAccount.name}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </S.AccountHeader>
      <S.AccountInfoWrapper>
        <S.AccountType>
          {AccountTypeLabels[bankAccount.accountType as AccountType]}
        </S.AccountType>
        <S.Balance $negative={balance < 0}>
          {formatCurrencyBRL(balance)}
        </S.Balance>
      </S.AccountInfoWrapper>
    </S.AccountWrapper>
  );
};
