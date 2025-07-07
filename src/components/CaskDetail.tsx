import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCaskDetailQuery,
  usePatchCaskMutation,
  useDeleteCaskMutation,
} from '@/queries/cask';
import { caskFormSchema, CaskFormValues } from '@/schemas/caskSchema';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/form/InputField';
import { TextareaField } from '@/components/form/TextareaField';
import { SelectField } from '@/components/form/SelectField';
import { Button } from '@/components/ui/button';
import { CASK_CURRENCY_OPTIONS, OLARLA_OPTIONS } from '@/constants';

export default function CaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const caskId = Number(id);

  const form = useForm<CaskFormValues>({
    resolver: zodResolver(caskFormSchema),
    defaultValues: {
      cask_name: '',
      cask_number: '',
      abv: 0,
      bulk_liter: 0,
      capacity_liters: 0,
      malt_type: '',
      distillery_true_name: '',
      distillery_true_name_id: 0,
      distillery_display_name_id: 0,
      distillery_display_name: '',
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
      cask_currency: 'KRW',
      comment: '',
      olarla: 'OLA',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const { data } = useCaskDetailQuery(caskId);
  const patchMutation = usePatchCaskMutation(caskId);
  const deleteMutation = useDeleteCaskMutation(caskId, () =>
    navigate('/cask/list')
  );

  useEffect(() => {
    if (data) {
      const { events, ...formData } = data;
      reset(formData);
    }
  }, [data, reset]);

  const onSubmit = (values: CaskFormValues) => {
    patchMutation.mutate(values);
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteMutation.mutate();
    }
  };

  const events = data?.events || [];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">캐스크 수정</h1>
        <Button variant="destructive" onClick={handleDelete}>
          삭제
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <InputField form={form} name="cask_name" label="Cask 이름" />
          <InputField form={form} name="cask_number" label="Cask 번호" />
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
          <InputField form={form} name="abv" label="ABV" type="number" />
          <InputField form={form} name="malt_type" label="몰트 종류" />
          <InputField
            form={form}
            name="distillery_true_name_id"
            label="증류소 (공식) id"
            type="number"
          />
          <InputField
            form={form}
            name="distillery_true_name"
            label="증류소 (공식)"
          />
          <InputField
            form={form}
            name="distillery_display_name_id"
            label="증류소 (표기) id"
            type="number"
          />
          <InputField
            form={form}
            name="distillery_display_name"
            label="증류소 (표기)"
          />
          <InputField form={form} name="cask_size" label="캐스크 크기" />
          <InputField form={form} name="fill_type" label="필 타입" />
          <InputField form={form} name="seasoning" label="시즈닝" />
          <InputField
            form={form}
            name="warehouse_id"
            label="창고"
            type="number"
          />
          <InputField form={form} name="wood_type" label="우드 타입" />
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
          <div className="col-span-full">
            <TextareaField form={form} name="comment" label="비고" />
          </div>
          <div className="col-span-full pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || patchMutation.isPending}
            >
              저장
            </Button>
          </div>
        </form>
      </Form>

      {events.length > 0 && (
        <div className="pt-8">
          <h2 className="text-xl font-semibold">이벤트</h2>
          <ul className="list-disc pl-6 space-y-1">
            {events.map((event, idx) => (
              <li key={event.event_id ?? idx}>
                {event.event_at} | {event.event_type} - {event.event_price}{' '}
                {event.event_currency} ({event.event_comment})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
