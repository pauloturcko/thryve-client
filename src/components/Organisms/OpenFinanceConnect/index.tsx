"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useTheme } from "styled-components";
import { useToastContext } from "@/contexts/ToastContext";
import { useOpenFinance } from "@/hooks/useOpenFinance";

const PluggyConnect = dynamic(
  () => import("react-pluggy-connect").then((module) => module.PluggyConnect),
  { ssr: false }
);

type OpenFinanceConnectProps = {
  onClose: () => void;
  updateItemId?: string;
};

const includeSandbox = process.env.NODE_ENV !== "production";

export const OpenFinanceConnect = ({
  onClose,
  updateItemId,
}: OpenFinanceConnectProps) => {
  const theme = useTheme();
  const { dispatchToast } = useToastContext();
  const { createConnectToken, registerItem } = useOpenFinance();
  const { mutate: requestToken } = createConnectToken;

  useEffect(() => {
    requestToken(updateItemId, { onError: onClose });
  }, [requestToken, updateItemId, onClose]);

  const connectToken = createConnectToken.data;
  if (!connectToken) return null;

  return (
    <PluggyConnect
      connectToken={connectToken}
      includeSandbox={includeSandbox}
      updateItem={updateItemId}
      theme={theme.mode}
      onSuccess={({ item }) => {
        registerItem.mutate(item.id);
      }}
      onError={({ message }) => {
        dispatchToast({
          type: "error",
          message: `Não foi possível conectar o banco: ${message}`,
        });
      }}
      onClose={onClose}
    />
  );
};
