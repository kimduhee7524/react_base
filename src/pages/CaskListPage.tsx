import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caskSearchSchema } from '@/schemas/caskSchema';
import type {
  CaskSearchFormValues,
} from '@/schemas/caskSchema';
import { getCaskList, createCask } from '@/services/api/cask';
import type { CaskSearchDto } from '@/types/cask';
import { Pagination } from '@/components/common/Pagination';
import { CaskFilterForm } from '@/components/CaskFilterForm';
import { Button } from '@/components/ui/button';
import { CaskSkeletonItem } from '@/components/skeleton/CaskSkeletonItem';
import { CaskListItem } from '@/components/CaskListItem';
import { CaskCreateModal } from '@/components/CaskCreateModal';
import { toast } from 'sonner';
import { useQueryParams } from '@/lib/server-state/useQueryParams';
import { modal } from '@/lib/modal';

export default function CaskListPage() {
  const PAGE_SIZE = 10;
  const [searchParams, setSearchParams] = useSearchParams();

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
    defaultValues: {
      ...formValuesFromQuery,
    },
  });

  const { getValues } = form;
  const values = getValues();
  const { sort, ...filters } = values;

  const searchDto: CaskSearchDto = {
    ...filters,
  };

  const { data, loading, error, refetch } = useQueryParams(getCaskList, {
    pageable: {
      page: currentPage,
      size: PAGE_SIZE,
      sort: [sort],
    },
    searchDto,
  });

  const onSubmit = () => {
    const values = getValues();
    const newParams: Record<string, string> = { page: '1' };

    Object.entries(values).forEach(([key, val]) => {
      if (typeof val === 'boolean') {
        newParams[key] = String(val);
      } else if (val) {
        newParams[key] = val;
      }
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
      const result = await modal.openAsync((props) => (
        <CaskCreateModal {...props} />
      ));
      
      if (!result) {
        toast.info('캐스크 등록이 취소되었습니다.');
        return;
      }

      await createCask(result);
      toast.success('캐스크 등록 완료');
      refetch();
    } catch (err) {
      toast.error('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Cask 리스트</h1>
        <Button onClick={handleCreateClick}>캐스크 등록</Button>
      </div>

      <CaskFilterForm form={form} onSubmit={onSubmit} />

      {loading ? (
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CaskSkeletonItem key={i} />
          ))}
        </ul>
      ) : error ? (
        <p className="text-destructive">{error.message}</p>
      ) : data.data.content.length === 0 ? (
        <p>표시할 캐스크가 없습니다.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {data.data.content.map((cask) => (
              <CaskListItem key={cask.cask_id} cask={cask} />
            ))}
          </ul>

          <Pagination
            currentPage={currentPage - 1}
            totalPages={data.data.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}