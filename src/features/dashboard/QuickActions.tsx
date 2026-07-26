import { FiMic, FiSend, FiShare2, FiUserPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card';
import { useNotify } from '../../contexts/NotificationContext';

const actions = [
  { icon: FiMic, label: 'Start recording', tone: 'Evidence capture began.' },
  { icon: FiShare2, label: 'Share live location', tone: 'Live location shared with your guardian circle.' },
  { icon: FiUserPlus, label: 'Add guardian', tone: null, navigate: '/guardians' },
  { icon: FiSend, label: 'Send check-in', tone: 'Check-in sent to your guardians.' },
];

export default function QuickActions() {
  const notify = useNotify();
  const navigate = useNavigate();

  return (
    <Card>
      <div className="text-sky-300/80 text-xs uppercase tracking-wide mb-4">Quick actions</div>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => (action.navigate ? navigate(action.navigate) : notify(action.tone!, 'success'))}
            className="flex flex-col items-start gap-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors p-3.5 text-left"
          >
            <span className="h-8 w-8 rounded-xl bg-teal-500/15 text-teal-300 flex items-center justify-center">
              <action.icon size={14} />
            </span>
            <span className="text-xs text-sky-100 leading-snug">{action.label}</span>
          </button>
        ))}
      </div>
    </Card>
  );
}
