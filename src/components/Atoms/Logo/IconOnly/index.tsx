import { LogoMark } from "../LogoMark";

interface IconOnlyProps {
  size?: number;
}

export const IconOnly = ({ size }: IconOnlyProps) => <LogoMark size={size ?? 100} />;
