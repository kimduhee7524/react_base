import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo } from 'react';
import { caskFormSchema, CaskFormValues } from '@/schemas/caskSchema';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/form/InputField';
import { TextareaField } from '@/components/form/TextareaField';
import { SelectField } from '@/components/form/SelectField';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CASK_CURRENCY_OPTIONS, OLARLA_OPTIONS } from '@/constants';
import type { OverlayAsyncControllerComponent } from '@/lib/modal';
import { ModalWrapper } from '@/components/common/ModalWrapper';
import { caskFormDefaultValues } from '@/utils/defaultValues/CaskDefaultValues';


export const CaskCreateModal: OverlayAsyncControllerComponent<CaskFormValues> = memo(
  ({ isOpen, close, unmount }) => {
    const form = useForm<CaskFormValues>({
      resolver: zodResolver(caskFormSchema),
      defaultValues: caskFormDefaultValues,
    });

    const {
      handleSubmit,
      formState: { isSubmitting },
    } = form;

    return (
      <ModalWrapper isOpen={isOpen} onExited={unmount}>
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">캐스크 등록</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={()=> close()}
                className="h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>

            <Form {...form}>
              <form
                onSubmit={handleSubmit((values: CaskFormValues) =>close(values))}
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
                    onClick={()=> close()}
                  >
                    닫기
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    등록
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </ModalWrapper>
    );
  }
);