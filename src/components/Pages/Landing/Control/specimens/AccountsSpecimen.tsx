import Image from "next/image";
import { ThemeProvider } from "styled-components";
import mastercard from "@/assets/mastercard.svg";
import * as B from "@/components/Organisms/BankAccountInfo/styles";
import * as C from "@/components/Organisms/CardInfo/styles";
import { buildTheme } from "@/styles/theme";
import { formatCurrency } from "@/utils/format";
import { demoAccount, demoCard } from "../../data";
import * as S from "./styles";

const blackTheme = buildTheme("dark");

export const AccountsSpecimen = () => (
  <S.Wallet>
    <B.AccountWrapper
      as="div"
      $selected
    >
      <B.AccountHeader>
        <p>{demoAccount.name}</p>
      </B.AccountHeader>
      <B.AccountInfoWrapper>
        <B.AccountType>{demoAccount.type}</B.AccountType>
        <B.Balance $negative={false}>
          {formatCurrency(demoAccount.balance)}
        </B.Balance>
      </B.AccountInfoWrapper>
    </B.AccountWrapper>
    <ThemeProvider theme={blackTheme}>
      <C.CardWrapper
        as="div"
        $selected
        style={{ color: blackTheme.colors.textPrimary }}
      >
        <C.CardHeader>
          <p>{demoCard.name}</p>
        </C.CardHeader>
        <C.CardInfoWrapper>
          <C.InfoRow>
            <C.CardLastFourDigits>
              **** **** **** {demoCard.lastFourDigits}
            </C.CardLastFourDigits>
            <Image
              src={mastercard}
              alt=""
              width={40}
              height={28}
            />
          </C.InfoRow>
          <C.InfoRow>
            <p>Tipo</p>
            <span>{demoCard.type}</span>
          </C.InfoRow>
          <C.InfoRow>
            <p>Validade</p>
            <span>{demoCard.expiry}</span>
          </C.InfoRow>
          <C.InfoRow>
            <p>Limite</p>
            <span>{formatCurrency(demoCard.limit)}</span>
          </C.InfoRow>
        </C.CardInfoWrapper>
      </C.CardWrapper>
    </ThemeProvider>
  </S.Wallet>
);
