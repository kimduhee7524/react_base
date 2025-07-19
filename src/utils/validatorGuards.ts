import {
  StringValidatorBuilder,
  NumberValidatorBuilder,
  BooleanValidatorBuilder,
} from '@/types/validation';

export type Validators =
  | StringValidatorBuilder
  | NumberValidatorBuilder
  | BooleanValidatorBuilder;

export function isStringValidator(v?: Validators): v is StringValidatorBuilder {
  return v?.type === 'string';
}

export function isNumberValidator(v?: Validators): v is NumberValidatorBuilder {
  return v?.type === 'number';
}

export function isBooleanValidator(
  v?: Validators
): v is BooleanValidatorBuilder {
  return v?.type === 'boolean';
}
