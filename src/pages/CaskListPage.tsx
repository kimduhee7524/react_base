import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { caskSearchSchema } from '@/schemas/caskSchema';
import type { CaskSearchFormValues } from '@/schemas/caskSchema';
import { getCaskList } from '@/services/api/cask';
import type { Cask, Pageable, CaskSearchDto } from '@/types/cask';
import { Pagination } from '@/components/common/Pagination';
import { CaskFilterForm } from '@/components/CaskFilterForm';
import { Button } from '@/components/ui/button';
import { CaskCreateModal } from '@/components/CaskCreateModal';
import { CaskSkeletonItem } from '@/components/skeleton/CaskSkeletonItem';
import { ErrorMessage } from '@/components/common/ErrorMessage';

export default function CaskListPage() {
  const [casks, setCasks] = useState<Cask[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageable, setPageable] = useState<Pageable>({
    page: 1,
    size: 10,
    sort: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const form = useForm<CaskSearchFormValues>({
    resolver: zodResolver(caskSearchSchema),
    mode: 'onChange',
    defaultValues: {
      sort: '',
      is_active: true,
      cask_name: '',
      cask_number: '',
      cask_size: '',
      distillery_display_name: '',
      distillery_true_name: '',
      fill_type: '',
      malt_type: '',
      seasoning: '',
      warehouse: '',
      wood_type: '',
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
          ...pageable,
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
  }, []);

  const onSubmit = () => {
    setPageable((prev) => ({ ...prev, page: 1 }));
    fetchData();
  };

  const handlePageChange = (nextPage: number) => {
    setPageable((prev) => ({ ...prev, page: nextPage }));
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Cask 리스트</h1>
        <Button onClick={() => setShowCreateModal(true)}>캐스크 등록</Button>
      </div>

      <CaskFilterForm form={form} onSubmit={onSubmit} />

      {loading ? (
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CaskSkeletonItem key={i} />
          ))}
        </ul>
      ) : error ? (
        <ErrorMessage message={error} />
      ) : casks.length === 0 ? (
        <p>표시할 캐스크가 없습니다.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {casks.map((cask) => (
              <li
                key={cask.cask_id}
                className="p-4 border rounded-md shadow-sm bg-card hover:bg-accent transition-colors cursor-pointer"
              >
                <Link
                  to={`/cask/${cask.cask_id}`}
                  className="block w-full h-full"
                >
                  <div className="font-semibold text-lg">{cask.cask_name}</div>
                  <div className="text-sm text-muted-foreground">
                    번호: {cask.cask_number} / 몰트: {cask.malt_type} / ABV:{' '}
                    {cask.abv}%
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <Pagination
            currentPage={pageable.page - 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <CaskCreateModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={fetchData}
      />
    </div>
  );
}
