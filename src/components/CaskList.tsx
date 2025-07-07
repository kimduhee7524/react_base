import { CaskListItem } from '@/components/CaskListItem';
import { Pagination } from '@/components/common/Pagination';
import { useCaskListQuery } from '@/queries/cask';
import type { CaskSearchDto } from '@/types/cask';

export type CaskListProps = {
  pageable: {
    page: number;
    size: number;
    sort: string[];
  };
  searchDto: CaskSearchDto;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export function CaskList({
  pageable,
  searchDto,
  currentPage,
  onPageChange,
}: CaskListProps) {
  const { data } = useCaskListQuery({ pageable, searchDto });

  if (data.data.content.length === 0) {
    return <p>표시할 캐스크가 없습니다.</p>;
  }

  return (
    <>
      <ul className="space-y-4">
        {data.data.content.map((cask) => (
          <CaskListItem key={cask.cask_id} cask={cask} />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage - 1}
        totalPages={data.data.totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
