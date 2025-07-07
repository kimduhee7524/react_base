import { Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caskSearchSchema } from '@/schemas/caskSchema';
import type {
  CaskSearchFormValues,
  CaskFormValues,
} from '@/schemas/caskSchema';
import type { CaskSearchDto } from '@/types/cask';
import { Button } from '@/components/ui/button';
import { CaskFilterForm } from '@/components/CaskFilterForm';
import { useModal } from '@/lib/modal/useModal';
import { CaskCreateModal } from '@/components/CaskCreateModal';
import { toast } from 'sonner';
import { CaskSkeletonItem } from '@/components/skeleton/CaskSkeletonItem';
import { CaskList } from '@/components/CaskList';
import { ErrorBoundary } from 'react-error-boundary';
import { useCreateCaskMutation } from '@/queries/cask';

export default function CaskListPage() {
  const PAGE_SIZE = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const { open } = useModal<CaskFormValues>(CaskCreateModal);

  const currentPage = Number(searchParams.get('page') || '1');
  const currentSort = searchParams.get('sort') || '';
  const formValuesFromQuery: Partial<CaskSearchFormValues> = {
    is_active: searchParams.get('is_active') !== 'false',
    sort: currentSort,
    cask_name: searchParams.get('cask_name') || '',
    cask_number: searchParams.get('cask_number') || '',
    cask_size: searchParams.get('cask_size') || '',
    distillery_display_name: searchParams.get('distillery_display_name') || '',
    distillery_true_name: searchParams.get('distillery_true_name') || '',
    fill_type: searchParams.get('fill_type') || '',
    malt_type: searchParams.get('malt_type') || '',
    seasoning: searchParams.get('seasoning') || '',
    warehouse: searchParams.get('warehouse') || '',
    wood_type: searchParams.get('wood_type') || '',
  };

  const form = useForm<CaskSearchFormValues>({
    resolver: zodResolver(caskSearchSchema),
    mode: 'onChange',
    defaultValues: formValuesFromQuery,
  });

  const values = form.getValues();
  const { sort, ...filters } = values;
  const searchDto: CaskSearchDto = { ...filters };

  const createCaskMutation = useCreateCaskMutation(() => {
    toast.success('캐스크 등록 완료');
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set('page', '1');
      return updated;
    });
  });

  const onSubmit = () => {
    const values = form.getValues();
    const newParams: Record<string, string> = { page: '1' };

    Object.entries(values).forEach(([key, val]) => {
      if (typeof val === 'boolean') newParams[key] = String(val);
      else if (val) newParams[key] = val;
    });

    setSearchParams(newParams);
  };

  const handlePageChange = (nextPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(nextPage));
    setSearchParams(newParams);
  };

  const handleCreateClick = async () => {
    try {
      const result = await open();
      if (!result) return;
      createCaskMutation.mutate(result);
    } catch {
      toast.error('등록 실패');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Cask 리스트</h1>
        <Button onClick={handleCreateClick}>캐스크 등록</Button>
      </div>

      <CaskFilterForm form={form} onSubmit={onSubmit} />

      <ErrorBoundary
        fallbackRender={({ error }) => (
          <p className="text-destructive">
            {error.message || '알 수 없는 에러가 발생했습니다.'}
          </p>
        )}
      >
        <Suspense
          fallback={
            <ul className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <CaskSkeletonItem key={i} />
              ))}
            </ul>
          }
        >
          <CaskList
            pageable={{
              page: currentPage,
              size: PAGE_SIZE,
              sort: [sort],
            }}
            searchDto={searchDto}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
