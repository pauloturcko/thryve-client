import { SquarePen, Trash2 } from "lucide-react";
import { styled } from "styled-components";
import * as A from "@/components/Atoms/ItemActions/styles";
import { staticPreview } from "../../styles";

const StaticActions = styled(A.Actions)`
  ${staticPreview};
`;

export const PreviewActions = ({ size = 28 }: { size?: number }) => (
  <StaticActions>
    <A.ActionButton as="span">
      <SquarePen size={size} />
    </A.ActionButton>
    <A.ActionButton
      as="span"
      $danger
    >
      <Trash2 size={size} />
    </A.ActionButton>
  </StaticActions>
);
