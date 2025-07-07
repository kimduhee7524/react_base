import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import CaskDetail from '@/components/CaskDetail';

export default function CaskDetailPage() {
  return (
    <ErrorBoundary
      fallback={<ErrorMessage message="데이터 로딩 중 오류가 발생했습니다." />}
    >
      <Suspense fallback={<LoadingSpinner size="lg" className="h-[60vh]" />}>
        <CaskDetail />
      </Suspense>
    </ErrorBoundary>
  );
}
