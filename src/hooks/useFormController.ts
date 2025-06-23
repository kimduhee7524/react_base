import { useRef, useState, useCallback, useEffect } from 'react';
import { ValidationRule } from '@/types/validation';

interface UseFormControllerOptions<T> {
  validators?: Partial<Record<keyof T, { rules: ValidationRule[] }>>;
  onSubmit: (values: T) => Promise<void>;
}

export function useFormController<T>({
  validators = {},
  onSubmit,
}: UseFormControllerOptions<T>) {
  const refs = useRef<Partial<Record<keyof T, HTMLInputElement | null>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof T, string | null>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timers = useRef<Partial<Record<keyof T, NodeJS.Timeout>>>({});

  const getValue = (name: string) => refs.current[name as keyof T]?.value || '';

  const runValidators = (name: keyof T, value: string) => {
    const rules = validators[name]?.rules || [];
    for (const rule of rules) {
      const error = rule(value, getValue);
      if (error) return error;
    }
    return null;
  };

  // input 타입 기준으로 변환
  const parseValue = <K extends keyof T>(key: K, raw: string): T[K] => {
    const el = refs.current[key];
    if (!el) return raw as T[K];

    switch (el.type) {
      case 'number':
        return Number(raw) as T[K];
      case 'checkbox':
        return el.checked as T[K];
      default:
        return raw as T[K];
    }
  };

  const handleInput = useCallback((name: keyof T) => {
    const el = refs.current[name];
    if (!el) return;
    const value = el.value;
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
        const raw = el.type === 'checkbox' ? String(el.checked) : el.value;
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
      const raw = el.value;
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
    refs.current[name] = el;
  };

  useEffect(() => {
    const currentTimers = timers.current;
    return () => {
      Object.values(currentTimers).forEach(clearTimeout);
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
