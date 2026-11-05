"use client";

import { useEffect, useState } from "react";
import { useToastContext } from "@/contexts/ToastContext";
import * as S from "./styles";

export const Toast = () => {
  const { message, type, id } = useToastContext();
  const [status, setStatus] = useState<"hidden" | "visible" | "leaving">(
    "hidden"
  );

  useEffect(() => {
    if (id === 0) return;

    const showTimer = setTimeout(() => setStatus("visible"), 0);
    const hideTimer = setTimeout(() => setStatus("leaving"), 2700);
    const removeTimer = setTimeout(() => setStatus("hidden"), 3000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [id]);

  if (status === "hidden") return null;

  return (
    <S.Wrapper
      $type={type}
      $leaving={status === "leaving"}
    >
      {typeof message === "object" ? JSON.stringify(message) : message}
    </S.Wrapper>
  );
};
