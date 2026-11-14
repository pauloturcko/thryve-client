import { enumToOptions } from "@/utils/enum-options";

export enum CardFlag {
  Visa = 1,
  Mastercard = 2,
}
export const CardFlagOptions = enumToOptions(CardFlag);
