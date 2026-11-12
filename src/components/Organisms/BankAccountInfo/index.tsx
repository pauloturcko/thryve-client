import {
  AccountType,
  AccountTypeLabels,
} from "@/constants/enums/account-type-enum";
import { BankAccount } from "@/services/bank-account-service";
import { formatCurrencyBRL } from "@/utils/format";
import * as S from "./styles";

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
        <S.Balance $negative={balance < 0}>
          {formatCurrencyBRL(balance)}
        </S.Balance>
      </S.AccountInfoWrapper>
    </S.AccountWrapper>
  );
};
