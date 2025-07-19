import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function SelectField<TFieldValues extends FieldValues>({
  form,
  name,
  label,
  options,
  placeholder = '선택하세요',
  className,
}: SelectFieldProps<TFieldValues>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selected = options.find((opt) => opt.value === field.value);
        return (
          <FormItem className={className}>
            {label && (
              <FormLabel className="block text-sm font-medium">
                {label}
              </FormLabel>
            )}
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value ?? ''}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder}>
                    {selected?.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage className="text-destructive text-sm mt-1" />
          </FormItem>
        );
      }}
    />
  );
}
