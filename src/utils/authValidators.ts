import { ValidatorBuilder, ValidationRule } from '@/types/validation';

function createValidatorBuilder(): ValidatorBuilder {
  const rules: ValidationRule[] = [];

  const builder: ValidatorBuilder = {
    rules,

    required(message = '필수 입력입니다.') {
      rules.push((value) => (value.trim() ? null : message));
      return builder;
    },

    min(n, message) {
      rules.push((value) =>
        value.length >= n ? null : message || `${n}자 이상 입력해주세요.`
      );
      return builder;
    },

    max(n, message) {
      rules.push((value) =>
        value.length <= n ? null : message || `${n}자 이하로 입력해주세요.`
      );
      return builder;
    },

    email(message = '이메일 형식이 아닙니다.') {
      rules.push((value) => (/\S+@\S+\.\S+/.test(value) ? null : message));
      return builder;
    },

    regex(pattern, message = '형식이 올바르지 않습니다.') {
      rules.push((value) => (pattern.test(value) ? null : message));
      return builder;
    },

    custom(rule) {
      rules.push(rule);
      return builder;
    },

    same(field, message = '일치하지 않습니다.') {
      rules.push((value, get) => (value === get?.(field) ? null : message));
      return builder;
    },
  };

  return builder;
}

export function string() {
  return createValidatorBuilder();
}

export function number() {
  const builder = createValidatorBuilder();
  builder.rules.unshift((value) =>
    isNaN(Number(value)) ? '숫자만 입력 가능합니다.' : null
  );
  return builder;
}

export const s = {
  string,
  number,
};
