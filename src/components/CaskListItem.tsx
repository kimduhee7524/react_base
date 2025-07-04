import { Link } from 'react-router-dom';
import type { Cask } from '@/types/cask';

interface Props {
  cask: Cask;
}

export function CaskListItem({ cask }: Props) {
  return (
    <li className="p-4 border rounded-md shadow-sm bg-card hover:bg-accent transition-colors cursor-pointer">
      <Link to={`/cask/${cask.cask_id}`} className="block w-full h-full">
        <div className="font-semibold text-lg">{cask.cask_name}</div>
        <div className="text-sm text-muted-foreground">
          번호: {cask.cask_number} / 몰트: {cask.malt_type} / ABV: {cask.abv}%
        </div>
      </Link>
    </li>
  );
}
