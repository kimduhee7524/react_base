import { Textarea } from '@/components/ui/textarea';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

interface TextareaFieldProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  className?: string;
}

export function TextareaField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  className,
}: TextareaFieldProps<TFieldValues>) {
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
            <Textarea {...field} placeholder={placeholder} />
          </FormControl>
          <FormMessage className="text-destructive text-sm mt-1" />
        </FormItem>
      )}
    />
  );
}
