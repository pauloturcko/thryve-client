import { MouseEvent, ReactNode } from "react";
import * as S from "./styles";

type PanelProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

export const Panel = ({
  title,
  description,
  action,
  children,
  className,
  onClick,
}: PanelProps) => (
  <S.Container
    className={className}
    onClick={onClick}
  >
    <S.Header>
      <S.Heading>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </S.Heading>
      {action}
    </S.Header>
    {children}
  </S.Container>
);
