import { useRef, useState, useCallback } from 'react';
import { ValidationRule } from '@/types/validation';

interface UseFormControllerOptions<T> {
  validators?: Record<string, { rules: ValidationRule[] }>;
  onSubmit: (values: T) => Promise<void>;
}

export function useFormController<T>({
  validators = {},
  onSubmit,
}: UseFormControllerOptions<T>) {
  const refs = useRef<Record<string, HTMLInputElement | null>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timers = useRef<Record<string, NodeJS.Timeout>>({});
  const getValue = (name: string) => refs.current[name]?.value || '';

  const runValidators = (name: string, value: string) => {
    const rules = validators[name]?.rules || [];
    for (const rule of rules) {
      const error = rule(value, getValue);
      if (error) return error;
    }
    return null;
  };

  const handleInput = useCallback((name: string) => {
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
    const newErrors: Record<string, string | null> = {};
    for (const key in refs.current) {
      const el = refs.current[key];
      if (el) {
        newErrors[key] = runValidators(key, el.value);
      }
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    const values: Record<string, string> = {};
    for (const key in refs.current) {
      values[key] = refs.current[key]?.value || '';
    }
    setIsSubmitting(true);
    try {
      await onSubmit(values as T);
    } finally {
      setIsSubmitting(false);
    }
  };

  const registerRef = (name: string) => (el: HTMLInputElement | null) => {
    refs.current[name] = el;
  };

  return {
    refs,
    errors,
    isSubmitting,
    handleInput,
    handleSubmit,
    registerRef,
  };
}
