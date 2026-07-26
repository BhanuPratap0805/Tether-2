import { FiAlertTriangle, FiCpu, FiMapPin, FiSettings, FiUsers } from 'react-icons/fi';
import Card from '../../components/common/Card';
import type { TimelineEvent } from '../../types';
import { formatClock, timeAgo } from '../../utils/format';

const typeIcon: Record<TimelineEvent['type'], typeof FiMapPin> = {
  location: FiMapPin,
  alert: FiAlertTriangle,
  ai: FiCpu,
  guardian: FiUsers,
  system: FiSettings,
};

const typeColor: Record<TimelineEvent['type'], string> = {
  location: 'text-sky-300 bg-sky-400/10',
  alert: 'text-coral-400 bg-coral-500/10',
  ai: 'text-teal-300 bg-teal-500/10',
  guardian: 'text-sky-200 bg-sky-300/10',
  system: 'text-sky-400 bg-sky-500/10',
};

interface IncidentTimelineProps {
  events: TimelineEvent[];
  title?: string;
  compact?: boolean;
}

export default function IncidentTimeline({ events, title = 'Timeline', compact = false }: IncidentTimelineProps) {
  return (
    <Card>
      <div className="text-sky-300/80 text-xs uppercase tracking-wide mb-4">{title}</div>
      <ol className="relative pl-6">
        <div className="absolute left-[9px] top-1.5 bottom-1.5 w-px bg-white/[0.08]" />
        {events.map((event) => {
          const Icon = typeIcon[event.type];
          return (
            <li key={event.id} className={compact ? 'pb-4' : 'pb-6'}>
              <span
                className={`absolute -left-0 flex h-[19px] w-[19px] items-center justify-center rounded-full ${typeColor[event.type]}`}
              >
                <Icon size={10} />
              </span>
              <div className="ml-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-sky-50 font-medium">{event.title}</p>
                  <span className="text-[11px] font-mono text-sky-400/70 shrink-0">
                    {compact ? timeAgo(event.timestamp) : formatClock(event.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-sky-300/75 mt-1 leading-relaxed">{event.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
