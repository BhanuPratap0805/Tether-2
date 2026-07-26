import { useEffect, useState } from 'react';
import { FiCloudRain, FiSun } from 'react-icons/fi';
import Card from '../../components/common/Card';
import { fetchAIInsights } from '../../services/safetyService';
import type { AIInsight } from '../../types';

const toneIcon: Record<AIInsight['tone'], typeof FiSun> = {
  reassuring: FiSun,
  advisory: FiCloudRain,
  urgent: FiCloudRain,
};

export default function AIInsights() {
  const [insights, setInsights] = useState<AIInsight[]>([]);

  useEffect(() => {
    fetchAIInsights().then(setInsights);
  }, []);

  return (
    <Card>
      <div className="text-sky-300/80 text-xs uppercase tracking-wide mb-4">AI insights</div>
      <ul className="space-y-4">
        {insights.map((insight) => {
          const Icon = toneIcon[insight.tone];
          return (
            <li key={insight.id} className="flex items-start gap-3">
              <span className="mt-0.5 h-8 w-8 rounded-xl bg-sky-400/10 text-sky-300 flex items-center justify-center shrink-0">
                <Icon size={15} />
              </span>
              <p className="text-sm text-sky-100/90 leading-relaxed">{insight.message}</p>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
