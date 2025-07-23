import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  return (
    <div className="flex justify-center space-x-4 mt-6">
      <Button
        variant="outline"
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      >
        이전
      </Button>
      <span>
        {currentPage + 1} / {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={currentPage + 1 >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        다음
      </Button>
    </div>
  );
}
