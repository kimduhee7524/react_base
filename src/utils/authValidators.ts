import {
  StringValidatorBuilder,
  NumberValidatorBuilder,
  BooleanValidatorBuilder,
  ValidationRule,
} from '@/types/validation';

class StringValidator implements StringValidatorBuilder {
  type = 'string' as const;
  rules: ValidationRule[] = [];

  required(message = '필수 입력입니다.') {
    this.rules.push((v) => (v?.trim() ? null : message));
    return this;
  }

  min(n: number, message?: string) {
    this.rules.push((v) =>
      v.length >= n ? null : message || `${n}자 이상 입력해주세요.`
    );
    return this;
  }

  max(n: number, message?: string) {
    this.rules.push((v) =>
      v.length <= n ? null : message || `${n}자 이하로 입력해주세요.`
    );
    return this;
  }

  email(message = '이메일 형식이 아닙니다.') {
    this.rules.push((v) => (/\S+@\S+\.\S+/.test(v) ? null : message));
    return this;
  }

  regex(pattern: RegExp, message = '형식이 올바르지 않습니다.') {
    this.rules.push((v) => (pattern.test(v) ? null : message));
    return this;
  }

  same(field: string, message = '일치하지 않습니다.') {
    this.rules.push((v, get) => (v === get?.(field) ? null : message));
    return this;
  }

  custom(rule: ValidationRule) {
    this.rules.push(rule);
    return this;
  }
}

class NumberValidator implements NumberValidatorBuilder {
  type = 'number' as const;
  rules: ValidationRule[] = [];

  constructor() {
    this.rules.push((v) =>
      isNaN(Number(v)) ? '숫자만 입력 가능합니다.' : null
    );
  }

  required(message = '필수 입력입니다.') {
    this.rules.push((v) => (v?.toString()?.trim() ? null : message));
    return this;
  }

  min(n: number, message?: string) {
    this.rules.push((v) =>
      Number(v) >= n ? null : message || `${n} 이상이어야 합니다.`
    );
    return this;
  }

  max(n: number, message?: string) {
    this.rules.push((v) =>
      Number(v) <= n ? null : message || `${n} 이하이어야 합니다.`
    );
    return this;
  }

  same(field: string, message = '일치하지 않습니다.') {
    this.rules.push((v, get) => (v === get?.(field) ? null : message));
    return this;
  }

  custom(rule: ValidationRule) {
    this.rules.push(rule);
    return this;
  }
}

class BooleanValidator implements BooleanValidatorBuilder {
  type = 'boolean' as const;
  rules: ValidationRule[] = [];
  private isOptional = false;
  private isNullable = false;

  required(message = '필수 항목입니다.') {
    this.rules.push((v) => {
      if (this.isOptional) return null;
      if (this.isNullable && (v === '' || v === 'false')) return null;
      return v === 'true' ? null : message;
    });
    return this;
  }

  optional() {
    this.isOptional = true;
    return this;
  }

  nullable() {
    this.isNullable = true;
    return this;
  }
}

export function string(): StringValidatorBuilder {
  return new StringValidator();
}
export function number(): NumberValidatorBuilder {
  return new NumberValidator();
}
export function boolean(): BooleanValidatorBuilder {
  return new BooleanValidator();
}

export const s = { string, number, boolean };
