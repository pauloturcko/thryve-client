"use client";

import { ReactNode } from "react";
import { reveal } from "../useReveal";
import { HeadingLayout } from "./styles";
import * as S from "./styles";

type SectionHeadingProps = {
  titleId: string;
  title: ReactNode;
  lead?: ReactNode;
  status?: ReactNode;
  layout?: HeadingLayout;
};

export const SectionHeading = ({
  titleId,
  title,
  lead,
  status,
  layout = "split",
}: SectionHeadingProps) => (
  <S.Heading $layout={layout}>
    {status && <S.Status {...reveal()}>{status}</S.Status>}
    <S.Title
      id={titleId}
      {...reveal(1)}
    >
      {title}
    </S.Title>
    {lead && <S.Lead {...reveal(2)}>{lead}</S.Lead>}
  </S.Heading>
);
