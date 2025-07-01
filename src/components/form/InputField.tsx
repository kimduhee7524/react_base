import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
}

export function InputField<T extends FieldValues>({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  className,
}: InputFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="block text-sm font-medium">{label}</FormLabel>
          )}
          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} />
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
        </FormItem>
      )}
    />
  );
}
