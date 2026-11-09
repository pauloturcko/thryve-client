"use client";

import { ReactNode } from "react";
import * as S from "./styles";

type BaseModalPops = {
  children: ReactNode;
  title: string;
  onClose: () => void;
};

export const BaseModal = ({
  children,
  title = "Modal Title",
  onClose,
}: BaseModalPops) => {
  return (
    <S.Overlay onClick={onClose}>
      <S.ModalPanel
        title={title}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </S.ModalPanel>
    </S.Overlay>
  );
};
