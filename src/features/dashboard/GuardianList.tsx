import { FiChevronRight, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import { useGuardians } from '../../contexts/GuardianContext';
import { initials } from '../../utils/format';

export default function GuardianList() {
  const { guardians, isLoading } = useGuardians();

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sky-300/80 text-xs uppercase tracking-wide">
          <FiUsers size={13} /> Guardian circle
        </div>
        <Link to="/guardians" className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-0.5">
          Manage <FiChevronRight size={12} />
        </Link>
      </div>

      {isLoading ? (
        <p className="text-xs text-sky-300/60">Loading guardians…</p>
      ) : (
        <ul className="space-y-3">
          {guardians.slice(0, 4).map((g) => (
            <li key={g.id} className="flex items-center gap-3">
              <span
                className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-semibold text-dusk-950 shrink-0"
                style={{ backgroundColor: g.avatarColor }}
              >
                {initials(g.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-sky-50 truncate">{g.name}</p>
                <p className="text-xs text-sky-300/70">{g.relation}</p>
              </div>
              {g.isPrimary && (
                <span className="text-[10px] text-teal-300 bg-teal-500/10 rounded-full px-2 py-0.5 shrink-0">
                  Primary
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
