import { ReactNode } from "react";
import * as S from "./styles";

type PageWrapperProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

export const PageWrapper = ({
  title,
  description,
  action,
  children,
}: PageWrapperProps) => (
  <S.Wrapper>
    <S.Header>
      <S.Heading>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </S.Heading>
      {action}
    </S.Header>
    {children}
  </S.Wrapper>
);
