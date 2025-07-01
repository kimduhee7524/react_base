import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  getCaskDetail,
  patchCaskDetail,
  deleteCask,
} from '@/services/api/cask';
import { caskFormSchema, CaskFormValues } from '@/schemas/caskSchema';
import { Form } from '@/components/ui/form';
import { InputField } from '@/components/form/InputField';
import { TextareaField } from '@/components/form/TextareaField';
import { SelectField } from '@/components/form/SelectField';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { toast } from 'sonner';
import { CASK_CURRENCY_OPTIONS, OLARLA_OPTIONS } from '@/constants';
import { CaskEvent } from '@/types/cask';

export default function CaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [events, setEvents] = useState<CaskEvent[]>([]);

  const form = useForm<CaskFormValues>({
    resolver: zodResolver(caskFormSchema),
    defaultValues: {},
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const { events, ...formData } = await getCaskDetail(Number(id));
        reset(formData);
        setEvents(events);
      } catch (err) {
        console.error(err);
        setLoadError('캐스크 정보를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, reset]);

  const onSubmit = async (values: CaskFormValues) => {
    try {
      if (!id) return;
      await patchCaskDetail(Number(id), values);
      toast.success('저장되었습니다.');
    } catch (err) {
      console.error(err);
      toast.error('저장에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await deleteCask(Number(id));
      toast.success('삭제되었습니다.');
      navigate('/cask/list');
    } catch (err) {
      console.error(err);
      toast.error('삭제에 실패했습니다.');
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="h-[60vh]" />;
  if (loadError) return <ErrorMessage message={loadError} />;

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
            <Button type="submit" disabled={isSubmitting}>
              저장
            </Button>
          </div>
        </form>
      </Form>

      {events && events.length > 0 && (
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
