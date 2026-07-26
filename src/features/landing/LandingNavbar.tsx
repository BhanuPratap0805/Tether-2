import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import TetherMark from '../../components/common/TetherMark';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Why Tether', href: '#why-tether' },
  { label: 'Stories', href: '#stories' },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl"
    >
      <div className="glass rounded-full px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <TetherMark size={32} animated={false} />
          <span className="font-display text-lg text-sky-50 tracking-tight">Tether</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-sky-200 hover:text-sky-50 transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/login">
            <Button variant="primary" size="sm">Get Tether</Button>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-sky-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass mt-2 rounded-3xl px-6 py-5 flex flex-col gap-4 md:hidden"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-sky-200" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <Link to="/login" onClick={() => setOpen(false)}>
            <Button variant="primary" size="sm" fullWidth>Get Tether</Button>
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
}
