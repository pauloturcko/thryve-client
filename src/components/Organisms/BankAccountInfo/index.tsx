import {
  AccountType,
  AccountTypeLabels,
} from "@/constants/enums/account-type-enum";
import { BankAccount } from "@/services/bank-account-service";
import * as S from "./styles";
import { useFormatCurrency } from "@/hooks/useFormatCurrency";

type BankAccountInfoProps = {
  bankAccount: BankAccount;
  selected?: boolean;
  onSelect: () => void;
};

export const BankAccountInfo = ({
  bankAccount,
  selected = false,
  onSelect,
}: BankAccountInfoProps) => {
  const formatCurrency = useFormatCurrency();
  const balance = Number(bankAccount.balance);

  return (
    <S.AccountWrapper
      type="button"
      aria-pressed={selected}
      $selected={selected}
      onClick={onSelect}
    >
      <S.AccountHeader>
        <p>{bankAccount.name}</p>
      </S.AccountHeader>
      <S.AccountInfoWrapper>
        <S.AccountType>
          {AccountTypeLabels[bankAccount.accountType as AccountType]}
        </S.AccountType>
        <S.Balance $negative={balance < 0}>{formatCurrency(balance)}</S.Balance>
      </S.AccountInfoWrapper>
    </S.AccountWrapper>
  );
};
