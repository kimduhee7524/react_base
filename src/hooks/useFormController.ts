import { useRef, useState, useEffect, useCallback } from 'react';
import { Validators, isBooleanValidator } from '@/utils/validatorGuards';
import { getInputValue } from '@/utils/formHelpers';

interface UseFormControllerOptions<T> {
  validators: Record<keyof T, Validators>;
  defaultValues?: Partial<T>;
  onSubmit: (values: T) => Promise<void>;
}

export function useFormController<T>({
  validators,
  defaultValues = {},
  onSubmit,
}: UseFormControllerOptions<T>) {
  const refs = useRef<Partial<Record<keyof T, HTMLInputElement | null>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string | null>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timers = useRef<Partial<Record<keyof T, NodeJS.Timeout>>>({});

  const getValue = useCallback((field: keyof T): string => {
    return getInputValue(refs.current[field]);
  }, []);

  const runValidators = (name: keyof T, value: string) => {
    const validator = validators[name];
    const rules = validator.rules || [];
    for (const rule of rules) {
      const error = rule(value, (field) => getValue(field as keyof T));
      if (error) return error;
    }
    return null;
  };

  const parseValue = <K extends keyof T>(key: K, raw: string): T[K] => {
    const validator = validators[key];
    switch (validator.type) {
      case 'number':
        return Number(raw) as T[K];
      case 'boolean':
        return (raw === 'true') as T[K];
      case 'string':
      default:
        return raw as T[K];
    }
  };

  const handleInput = useCallback((name: keyof T) => {
    const el = refs.current[name];
    if (!el) return;
    const value = getInputValue(el);

    clearTimeout(timers.current[name]);
    timers.current[name] = setTimeout(() => {
      const error = runValidators(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }, 300);
  }, []);

  const validateAll = () => {
    const newErrors: Partial<Record<keyof T, string | null>> = {};
    for (const key in refs.current) {
      const k = key as keyof T;
      const el = refs.current[k];
      if (el) {
        const raw = getInputValue(el);
        newErrors[k] = runValidators(k, raw);
      }
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    const values = {} as T;
    for (const key in refs.current) {
      const k = key as keyof T;
      const el = refs.current[k];
      if (!el) continue;
      const raw = getInputValue(el);
      values[k] = parseValue(k, raw);
    }

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const registerRef = (name: keyof T) => (el: HTMLInputElement | null) => {
    const validator = validators[name];
    const value = defaultValues[name];

    if (el && !refs.current[name]) {
      if (isBooleanValidator(validator)) {
        el.checked = Boolean(value);
      } else if (value != null) {
        el.value = String(value);
      }
      refs.current[name] = el;
    }
  };

  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach(clearTimeout);
    };
  }, []);

  return {
    refs,
    errors,
    isSubmitting,
    handleInput,
    handleSubmit,
    registerRef,
  };
}
