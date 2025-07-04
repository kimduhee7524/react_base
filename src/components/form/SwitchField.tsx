import { Switch } from '@/components/ui/switch';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

interface SwitchFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label?: string;
  className?: string;
}

export function SwitchField<T extends FieldValues>({
  form,
  name,
  label,
  className,
}: SwitchFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel className="block text-sm font-medium mb-1">
              {label}
            </FormLabel>
          )}

          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={field.disabled}
            />
          </FormControl>

          <FormMessage className="text-destructive text-sm mt-1" />
        </FormItem>
      )}
    />
  );
}
