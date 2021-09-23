/**
 * get values of enum
 * for Joi validate data of enum type
 */
export function getEnumValues(
  E: Record<string, string | number>
): (string | number)[] {
  const keys = Object.keys(E).filter((key) => Object.is(+key, NaN));
  const values = keys.map((key) => E[key as any]);

  return values;
}
