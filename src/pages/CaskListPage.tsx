import { useEffect, useState } from 'react';
import { getCaskList } from '@/services/api/cask';
import type { Cask, CaskSearchDto } from '@/types/cask';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function CaskListPage() {
  const [filters, setFilters] = useState<CaskSearchDto>({
    is_active: true,
    order_by: 0,
  });
  const [casks, setCasks] = useState<Cask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCaskList(filters);
      setCasks(data);
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

  const handleChange = <K extends keyof CaskSearchDto>(
    name: K,
    value: CaskSearchDto[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value === '' ? undefined : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Cask 리스트</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="cask_name">Cask 이름</Label>
            <Input
              id="cask_name"
              value={filters.cask_name ?? ''}
              onChange={(e) => handleChange('cask_name', e.target.value)}
              placeholder="예: Aberlour"
            />
          </div>

          <div>
            <Label htmlFor="cask_number">Cask 번호</Label>
            <Input
              id="cask_number"
              value={filters.cask_number ?? ''}
              onChange={(e) => handleChange('cask_number', e.target.value)}
              placeholder="예: 123456"
            />
          </div>

          <div>
            <Label htmlFor="is_active">활성 여부</Label>
            <Select
              value={
                filters.is_active === undefined
                  ? 'all'
                  : filters.is_active
                    ? 'true'
                    : 'false'
              }
              onValueChange={(value) => {
                if (value === 'all') {
                  handleChange('is_active', undefined);
                } else {
                  handleChange('is_active', value === 'true');
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="true">활성</SelectItem>
                <SelectItem value="false">비활성</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="mt-2">
          검색
        </Button>
      </form>

      {loading ? (
        <p className="text-muted-foreground">불러오는 중...</p>
      ) : error ? (
        <p className="text-destructive">{error}</p>
      ) : casks.length === 0 ? (
        <p>표시할 캐스크가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {casks.map((cask) => (
            <li
              key={cask.cask_id}
              className="p-4 border rounded-md shadow-sm bg-card"
            >
              <div className="font-semibold text-lg">{cask.cask_name}</div>
              <div className="text-sm text-muted-foreground">
                번호: {cask.cask_number} / 몰트: {cask.malt_type} / ABV:{' '}
                {cask.abv}%
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
