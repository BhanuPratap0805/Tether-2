import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiBell, FiLogOut, FiMenu, FiShield } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { initials } from '../../utils/format';

interface TopNavbarProps {
  onOpenMobileMenu: () => void;
  title: string;
}

export default function TopNavbar({ onOpenMobileMenu, title }: TopNavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 glass border-x-0 border-t-0 rounded-none">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-2 text-sky-100"
          aria-label="Open menu"
        >
          <FiMenu size={20} />
        </button>
        <h1 className="text-lg sm:text-xl font-medium text-sky-50 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/emergency"
          className="hidden sm:inline-flex items-center gap-2 rounded-full bg-coral-500/15 text-coral-400 px-4 py-2 text-sm font-medium hover:bg-coral-500/25 transition-colors"
        >
          <FiShield size={15} /> Emergency
        </Link>

        <button
          aria-label="Notifications"
          className="p-2.5 rounded-full hover:bg-white/[0.08] text-sky-200 relative"
        >
          <FiBell size={18} />
          <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-teal-400" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="h-9 w-9 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-xs font-semibold"
          >
            {user ? initials(user.name) : 'TU'}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-52 glass rounded-2xl p-2 text-sm"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <div className="px-3 py-2">
                  <p className="text-sky-50 font-medium truncate">{user?.name}</p>
                  <p className="text-sky-300/70 text-xs truncate">{user?.email}</p>
                </div>
                <div className="h-px bg-white/[0.08] my-1" />
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-xl text-sky-200 hover:bg-white/[0.06]"
                  onClick={() => setMenuOpen(false)}
                >
                  View profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-coral-400 hover:bg-white/[0.06] text-left"
                >
                  <FiLogOut size={14} /> Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
