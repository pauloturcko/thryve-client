export type EnumOption<TValue> = {
  value: TValue;
  label: string;
};

export const enumToOptions = <TValue extends number>(
  enumObject: Record<string, string | TValue>,
  labels?: Record<TValue, string>
): EnumOption<TValue>[] =>
  Object.entries(enumObject)
    .filter(([key]) => isNaN(Number(key)))
    .map(([key, value]) => ({
      value: value as TValue,
      label: labels ? labels[value as TValue] : key,
    }));
