import { useEffect, useState } from 'react';
import Loader from '../../components/common/Loader';
import IncidentTimeline from '../dashboard/IncidentTimeline';
import { fetchHistory } from '../../services/safetyService';
import type { TimelineEvent } from '../../types';

export default function HistoryPage() {
  const [events, setEvents] = useState<TimelineEvent[] | null>(null);

  useEffect(() => {
    fetchHistory().then(setEvents);
  }, []);

  return (
    <div className="max-w-2xl pb-10">
      <p className="text-sm text-sky-300/75 mb-6 max-w-md">
        Every check-in, alert, and guardian change Tether has recorded for you.
      </p>
      {!events ? (
        <Loader label="Loading your history…" />
      ) : (
        <IncidentTimeline events={events} title="Full history" />
      )}
    </div>
  );
}
