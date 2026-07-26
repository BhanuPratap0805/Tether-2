import { motion } from 'framer-motion';
import TetherMark from '../../components/common/TetherMark';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-dusk-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <TetherMark size={64} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-5 text-2xl font-semibold text-sky-50 tracking-tight"
      >
        Tether
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="mt-1.5 text-sm text-sky-300/80 tracking-wide"
      >
        Predict. Protect. Preserve.
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 120 }}
        transition={{ delay: 0.4, duration: 1.1, ease: 'easeInOut' }}
        className="mt-7 h-[3px] rounded-full bg-gradient-to-r from-teal-500 via-sky-300 to-teal-400"
      />
    </div>
  );
}
