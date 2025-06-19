export type ValidationRule = (
  value: string,
  get?: (field: string) => string
) => string | null;

export interface ValidatorBuilder {
  rules: ValidationRule[];
  required(message?: string): ValidatorBuilder;
  min(n: number, message?: string): ValidatorBuilder;
  max(n: number, message?: string): ValidatorBuilder;
  email(message?: string): ValidatorBuilder;
  regex(pattern: RegExp, message?: string): ValidatorBuilder;
  custom(
    rule: (value: string, get: (field: string) => string) => string | null
  ): ValidatorBuilder;
  same(field: string, message?: string): ValidatorBuilder;
}
