import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiActivity } from 'react-icons/fi';
import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import { fetchRiskScore } from '../../services/safetyService';
import type { RiskScore } from '../../types';
import { timeAgo } from '../../utils/format';

const levelColor: Record<RiskScore['level'], string> = {
  low: '#4FA89B',
  moderate: '#7FA8C9',
  elevated: '#E39485',
  high: '#D97D6C',
};

export default function RiskCard() {
  const [risk, setRisk] = useState<RiskScore | null>(null);

  useEffect(() => {
    fetchRiskScore().then(setRisk);
  }, []);

  if (!risk) {
    return (
      <Card className="flex items-center justify-center min-h-[180px]">
        <Loader label="Reading current risk…" />
      </Card>
    );
  }

  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (risk.score / 100) * circumference;
  const color = levelColor[risk.level];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sky-300/80 text-xs uppercase tracking-wide">
          <FiActivity size={13} /> Risk score
        </div>
        <span className="text-[11px] text-sky-400/70">{timeAgo(risk.updatedAt)}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-xl font-semibold text-sky-50">{risk.score}</span>
            <span className="text-[10px] text-sky-300/70 capitalize">{risk.level}</span>
          </div>
        </div>

        <ul className="text-xs text-sky-300/80 space-y-1.5">
          {risk.factors.map((f) => (
            <li key={f} className="flex items-start gap-1.5">
              <span className="mt-1 h-1 w-1 rounded-full bg-teal-400 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
