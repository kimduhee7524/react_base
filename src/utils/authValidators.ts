import {
  StringValidatorBuilder,
  NumberValidatorBuilder,
  BooleanValidatorBuilder,
  ValidationRule,
} from '@/types/validation';

class StringValidator implements StringValidatorBuilder {
  type = 'string' as const;
  rules: ValidationRule[];

  constructor(rules: ValidationRule[] = []) {
    this.rules = rules;
  }

  required(message = '필수 입력입니다.'): this {
    const rule: ValidationRule = (v) => (v.trim() ? null : message);
    return new StringValidator([...this.rules, rule]) as this;
  }

  min(n: number, message?: string): this {
    const rule: ValidationRule = (v) =>
      v.length >= n ? null : message || `${n}자 이상 입력해주세요.`;
    return new StringValidator([...this.rules, rule]) as this;
  }

  max(n: number, message?: string): this {
    const rule: ValidationRule = (v) =>
      v.length <= n ? null : message || `${n}자 이하로 입력해주세요.`;
    return new StringValidator([...this.rules, rule]) as this;
  }

  email(message = '이메일 형식이 아닙니다.'): this {
    const rule: ValidationRule = (v) =>
      /\S+@\S+\.\S+/.test(v) ? null : message;
    return new StringValidator([...this.rules, rule]) as this;
  }

  regex(pattern: RegExp, message = '형식이 올바르지 않습니다.'): this {
    const rule: ValidationRule = (v) => (pattern.test(v) ? null : message);
    return new StringValidator([...this.rules, rule]) as this;
  }

  same(field: string, message = '일치하지 않습니다.'): this {
    const rule: ValidationRule = (v, get) =>
      v === get?.(field) ? null : message;
    return new StringValidator([...this.rules, rule]) as this;
  }

  custom(rule: ValidationRule): this {
    return new StringValidator([...this.rules, rule]) as this;
  }
}

class NumberValidator implements NumberValidatorBuilder {
  type = 'number' as const;
  rules: ValidationRule[];

  constructor(rules: ValidationRule[] = []) {
    this.rules = rules.length
      ? rules
      : [(v) => (isNaN(Number(v)) ? '숫자만 입력 가능합니다.' : null)];
  }

  required(message = '필수 입력입니다.'): this {
    const rule: ValidationRule = (v) =>
      v?.toString()?.trim() ? null : message;
    return new NumberValidator([...this.rules, rule]) as this;
  }

  min(n: number, message?: string): this {
    const rule: ValidationRule = (v) =>
      Number(v) >= n ? null : message || `${n} 이상이어야 합니다.`;
    return new NumberValidator([...this.rules, rule]) as this;
  }

  max(n: number, message?: string): this {
    const rule: ValidationRule = (v) =>
      Number(v) <= n ? null : message || `${n} 이하이어야 합니다.`;
    return new NumberValidator([...this.rules, rule]) as this;
  }

  same(field: string, message = '일치하지 않습니다.'): this {
    const rule: ValidationRule = (v, get) =>
      v === get?.(field) ? null : message;
    return new NumberValidator([...this.rules, rule]) as this;
  }

  custom(rule: ValidationRule): this {
    return new NumberValidator([...this.rules, rule]) as this;
  }
}

class BooleanValidator implements BooleanValidatorBuilder {
  type = 'boolean' as const;
  rules: ValidationRule[];

  constructor(rules: ValidationRule[] = []) {
    this.rules = rules;
  }

  required(message = '필수 항목입니다.'): this {
    const rule: ValidationRule = (v) => (v === 'true' ? null : message);
    return new BooleanValidator([...this.rules, rule]) as this;
  }

  optional(): this {
    const rule: ValidationRule = () => null;
    return new BooleanValidator([...this.rules, rule]) as this;
  }

  nullable(): this {
    const rule: ValidationRule = (v) =>
      v === '' || v === 'false' ? null : null;
    return new BooleanValidator([...this.rules, rule]) as this;
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
