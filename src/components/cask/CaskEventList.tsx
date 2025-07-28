import type { CaskEvent } from '@/types/cask';

interface CaskEventListProps {
  events: CaskEvent[];
}

export function CaskEventList({ events }: CaskEventListProps) {
  if (!events || events.length === 0) return null;

  return (
    <div className="pt-8">
      <h2 className="text-xl font-semibold">이벤트</h2>
      <ul className="list-disc pl-6 space-y-1">
        {events.map((event, idx) => (
          <li key={event.event_id ?? idx}>
            {event.event_at} | {event.event_type} - {event.event_price}{' '}
            {event.event_currency} ({event.event_comment})
          </li>
        ))}
      </ul>
    </div>
  );
}