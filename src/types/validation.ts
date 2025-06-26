export type ValidationRule = (
  value: string,
  get?: (field: string) => string
) => string | null;

export interface StringValidatorBuilder {
  type: 'string';
  rules: ValidationRule[];
  required(message?: string): this;
  min(n: number, message?: string): this;
  max(n: number, message?: string): this;
  email(message?: string): this;
  regex(pattern: RegExp, message?: string): this;
  same(field: string, message?: string): this;
  custom(rule: ValidationRule): this;
}

export interface NumberValidatorBuilder {
  type: 'number';
  rules: ValidationRule[];
  required(message?: string): this;
  min(n: number, message?: string): this;
  max(n: number, message?: string): this;
  same(field: string, message?: string): this;
  custom(rule: ValidationRule): this;
}

export interface BooleanValidatorBuilder {
  type: 'boolean';
  rules: ValidationRule[];
  required(message?: string): this;
  optional(): this;
  nullable(): this;
}
