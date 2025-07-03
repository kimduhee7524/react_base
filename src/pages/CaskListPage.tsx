import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caskSearchSchema } from '@/schemas/caskSchema';
import type {
  CaskSearchFormValues,
  CaskFormValues,
} from '@/schemas/caskSchema';
import { getCaskList, createCask } from '@/services/api/cask';
import type { Cask, CaskSearchDto } from '@/types/cask';
import { Pagination } from '@/components/common/Pagination';
import { CaskFilterForm } from '@/components/CaskFilterForm';
import { Button } from '@/components/ui/button';
import { CaskSkeletonItem } from '@/components/skeleton/CaskSkeletonItem';
import { CaskListItem } from '@/components/CaskListItem';
import { useModal } from '@/lib/modal/useModal';
import { CaskCreateModal } from '@/components/CaskCreateModal';
import { toast } from 'sonner';

export default function CaskListPage() {
  const PAGE_SIZE = 10;
  const [searchParams, setSearchParams] = useSearchParams();
  const [casks, setCasks] = useState<Cask[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    defaultValues: {
      ...formValuesFromQuery,
    },
  });

  const { getValues } = form;

  const fetchData = async () => {
    const values = getValues();
    const { sort, ...filters } = values;

    const searchDto: CaskSearchDto = {
      ...filters,
    };

    try {
      setLoading(true);
      setError(null);
      const res = await getCaskList({
        pageable: {
          page: currentPage,
          size: PAGE_SIZE,
          sort: [sort],
        },
        searchDto,
      });
      setCasks(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
      setError('캐스크 목록을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchParams]);

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
      const result = await open();
      if (!result) return;
      await createCask(result);
      toast.success('캐스크 등록 완료');
      fetchData();
    } catch (err) {
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

      {loading ? (
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CaskSkeletonItem key={i} />
          ))}
        </ul>
      ) : error ? (
        <p className="text-destructive">{error}</p>
      ) : casks.length === 0 ? (
        <p>표시할 캐스크가 없습니다.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {casks.map((cask) => (
              <CaskListItem key={cask.cask_id} cask={cask} />
            ))}
          </ul>

          <Pagination
            currentPage={currentPage - 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
