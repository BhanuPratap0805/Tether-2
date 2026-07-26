import { FiClock, FiMapPin, FiShieldOff, FiUsers } from 'react-icons/fi';
import Card from '../../components/common/Card';

const stats = [
  { icon: FiClock, label: 'Protected time this week', value: '11h 40m' },
  { icon: FiMapPin, label: 'Trips tracked', value: '14' },
  { icon: FiShieldOff, label: 'Alerts triggered', value: '0' },
  { icon: FiUsers, label: 'Active guardians', value: '3' },
];

export default function StatisticsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} padded className="!p-4">
          <stat.icon size={16} className="text-teal-400 mb-3" />
          <p className="text-xl font-semibold text-sky-50 font-mono">{stat.value}</p>
          <p className="text-xs text-sky-300/70 mt-1 leading-snug">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}
