import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/form/InputField';
import { TextareaField } from '@/components/form/TextareaField';
import { SelectField } from '@/components/form/SelectField';
import { caskFormSchema, CaskFormValues } from '@/schemas/caskSchema';
import { createCask } from '@/services/api/cask';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { CASK_CURRENCY_OPTIONS, OLARLA_OPTIONS } from '@/constants';

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onSuccess: () => void;
}

export function CaskCreateModal({ open, onOpenChange, onSuccess }: Props) {
  const form = useForm<CaskFormValues>({
    resolver: zodResolver(caskFormSchema),
    defaultValues: {
      cask_name: '',
      cask_number: '',
      abv: 0,
      malt_type: '',
      distillery_true_name: '',
      distillery_true_name_id: 0,
      distillery_display_name: '',
      distillery_display_name_id: 0,
      cask_size: '',
      fill_type: '',
      seasoning: '',
      warehouse_id: 0,
      wood_type: '',
      lpa: 0,
      price_per_bottle: 0,
      price_per_lpa: 0,
      purchase_price: 0,
      expected_arrival_price: 0,
      bulk_liter: 0,
      capacity_liters: 0,
      cask_currency: 'KRW',
      olarla: 'OLA',
      comment: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CaskFormValues) => {
    try {
      await createCask(values);
      toast.success('캐스크 등록 완료');
      onSuccess();
      reset();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error('캐스크 등록 실패');
    }
  };

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>캐스크 등록</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <InputField form={form} name="cask_name" label="Cask 이름" />
            <InputField form={form} name="cask_number" label="Cask 번호" />
            <InputField form={form} name="abv" label="ABV" type="number" />
            <InputField form={form} name="malt_type" label="몰트 종류" />
            <InputField
              form={form}
              name="distillery_true_name"
              label="증류소 (공식)"
            />
            <InputField
              form={form}
              name="distillery_true_name_id"
              label="증류소 (공식) ID"
              type="number"
            />
            <InputField
              form={form}
              name="distillery_display_name"
              label="증류소 (표기)"
            />
            <InputField
              form={form}
              name="distillery_display_name_id"
              label="증류소 (표기) ID"
              type="number"
            />
            <InputField form={form} name="cask_size" label="캐스크 크기" />
            <InputField form={form} name="fill_type" label="필 타입" />
            <InputField form={form} name="seasoning" label="시즈닝" />
            <InputField
              form={form}
              name="warehouse_id"
              label="창고 ID"
              type="number"
            />
            <InputField form={form} name="wood_type" label="우드 타입" />
            <InputField form={form} name="lpa" label="LPA" type="number" />
            <InputField
              form={form}
              name="price_per_bottle"
              label="병당 가격"
              type="number"
            />
            <InputField
              form={form}
              name="price_per_lpa"
              label="LPA당 가격"
              type="number"
            />
            <InputField
              form={form}
              name="purchase_price"
              label="구매 가격"
              type="number"
            />
            <InputField
              form={form}
              name="expected_arrival_price"
              label="도착 예상 가격"
              type="number"
            />
            <InputField
              form={form}
              name="bulk_liter"
              label="벌크 리터"
              type="number"
            />
            <InputField
              form={form}
              name="capacity_liters"
              label="용량(L)"
              type="number"
            />
            <SelectField
              form={form}
              name="cask_currency"
              label="통화"
              options={CASK_CURRENCY_OPTIONS}
            />
            <SelectField
              form={form}
              name="olarla"
              label="OLARLA"
              options={OLARLA_OPTIONS}
            />
            <div className="col-span-full">
              <TextareaField form={form} name="comment" label="비고" />
            </div>
            <div className="col-span-full pt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                닫기
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                등록
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
