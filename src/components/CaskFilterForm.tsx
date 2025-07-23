import type { CaskSearchFormValues } from '@/schemas/caskSchema';
import type { UseFormReturn } from 'react-hook-form';
import { CASK_FIELDS } from '@/constants';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/form/InputField';
import { SwitchField } from '@/components/form/SwitchField';
import { Form } from '@/components/ui/form';
import { SelectField } from '@/components/form/SelectField';

interface Props {
  form: UseFormReturn<CaskSearchFormValues>;
  onSubmit: () => void;
}

export function CaskFilterForm({ form, onSubmit }: Props) {
  const { handleSubmit } = form;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {CASK_FIELDS.map(([key, label]) => (
            <InputField
              key={key}
              form={form}
              name={key as keyof CaskSearchFormValues}
              label={label}
            />
          ))}

          <SwitchField form={form} name="is_active" label="활성 여부" />
          <div className="flex items-end justify-between gap-5">
            <SelectField
              form={form}
              name="sort"
              label="정렬 필드"
              placeholder="정렬 필드 선택"
              options={CASK_FIELDS.map(([field, label]) => ({
                value: field,
                label,
              }))}
            />

            <Button type="submit">검색</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
