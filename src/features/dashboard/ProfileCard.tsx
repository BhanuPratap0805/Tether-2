import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import { useAuth } from '../../contexts/AuthContext';
import { initials } from '../../utils/format';

export default function ProfileCard() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <Card className="flex items-center gap-4">
      <div className="h-14 w-14 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center text-lg font-semibold shrink-0">
        {initials(user.name)}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sky-50 font-medium truncate">{user.name}</p>
        <p className="text-xs text-sky-300/70 truncate">{user.email}</p>
        {user.bloodGroup && (
          <span className="inline-block mt-1.5 text-[11px] font-mono text-teal-300/90 bg-teal-500/10 rounded-full px-2 py-0.5">
            {user.bloodGroup}
          </span>
        )}
      </div>
      <Link to="/profile" className="text-sky-300/70 hover:text-sky-50 shrink-0" aria-label="View profile">
        <FiChevronRight />
      </Link>
    </Card>
  );
}
