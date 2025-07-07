import { CaskSkeletonItem } from './CaskSkeletonItem';

export function CaskListSkeleton() {
  return (
    <ul className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <CaskSkeletonItem key={i} />
      ))}
    </ul>
  );
}
