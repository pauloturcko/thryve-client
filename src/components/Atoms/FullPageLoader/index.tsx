"use client";

import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import * as S from "./styles";

// Evita piscar o loader em requests que terminam quase na hora.
const SHOW_DELAY_MS = 150;

export const FullPageLoader = () => {
  const busy = useIsFetching() + useIsMutating() > 0;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!busy) return;
    const timer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => {
      clearTimeout(timer);
      setVisible(false);
    };
  }, [busy]);

  if (!busy || !visible) return null;

  return (
    <S.Overlay
      role="status"
      aria-label="Carregando"
    >
      <S.Spinner aria-hidden="true" />
    </S.Overlay>
  );
};
