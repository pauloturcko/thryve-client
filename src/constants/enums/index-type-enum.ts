import { enumToOptions } from "@/utils/enum-options";

export enum IndexType {
  PreFixado = 0,
  Selic = 1,
  Cdi = 2,
  Ipca = 3,
  Nenhum = 4,
}

export const IndexTypeLabels: Record<IndexType, string> = {
  [IndexType.PreFixado]: "Pré-fixado",
  [IndexType.Selic]: "Selic",
  [IndexType.Cdi]: "CDI",
  [IndexType.Ipca]: "IPCA",
  [IndexType.Nenhum]: "Sem indexador",
};

export const IndexTypeOptions = enumToOptions(IndexType, IndexTypeLabels);
