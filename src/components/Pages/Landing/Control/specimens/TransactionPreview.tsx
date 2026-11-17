import { createElement } from "react";
import { CircleCheck, Clock } from "lucide-react";
import { styled } from "styled-components";
import * as T from "@/components/Organisms/TransactionInfo/styles";
import { staticPreview } from "../../styles";
import { getCategoryIcon } from "@/constants/categoryIcons";
import { formatCurrency } from "@/utils/format";
import { DemoTransaction } from "../../data";
import { PreviewActions } from "./PreviewActions";

const statusLabel = ({ variant, paid }: DemoTransaction) => {
  if (!paid) return "Pendente";
  return variant === "income" ? "Recebido" : "Pago";
};

const StaticStatus = styled(T.StatusButton)`
  ${staticPreview};
`;

export const TransactionPreview = ({
  transaction,
}: {
  transaction: DemoTransaction;
}) => (
  <T.TransactionWrapper>
    <T.IconWrapper $color={transaction.category.color}>
      {createElement(getCategoryIcon(transaction.category.icon), {
        size: 22,
      })}
    </T.IconWrapper>
    <T.Info>
      <T.Title>{transaction.title}</T.Title>
      <T.Details>{transaction.details.join(" • ")}</T.Details>
    </T.Info>
    <T.Footer>
      <StaticStatus
        as="span"
        $isPaid={transaction.paid}
      >
        {transaction.paid ? <CircleCheck size={14} /> : <Clock size={14} />}
        {statusLabel(transaction)}
      </StaticStatus>
      <T.Amount $variant={transaction.variant}>
        {transaction.variant === "income" ? "+" : "-"}{" "}
        {formatCurrency(transaction.amount)}
      </T.Amount>
    </T.Footer>
    <T.Actions>
      <PreviewActions />
    </T.Actions>
  </T.TransactionWrapper>
);
