import { motion, AnimatePresence } from 'framer-motion';
import { FiMic, FiMicOff, FiAlertTriangle } from 'react-icons/fi';
import type { DistressStatus } from '../../hooks/useVoiceDistressDetection';

interface VoiceIndicatorProps {
  status: DistressStatus;
  error: string | null;
  onStart: () => void;
  onStop: () => void;
  /** Compact mode: renders a single small dot instead of the full pill */
  compact?: boolean;
}

// ── Waveform bars — purely decorative when listening ─────────────────────────

function WaveformBars() {
  const bars = [0.4, 0.7, 1, 0.8, 0.5, 0.9, 0.6];
  return (
    <span className="flex items-center gap-[2px] h-4">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-full bg-teal-400"
          animate={{ scaleY: [h, 1, h * 0.6, 1, h] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.08,
            ease: 'easeInOut',
          }}
          style={{ height: '100%', transformOrigin: 'center' }}
        />
      ))}
    </span>
  );
}

// ── Compact dot variant (for embedding in TopNavbar / RiskCard) ───────────────

function CompactDot({ status }: { status: DistressStatus }) {
  if (status === 'idle') return null;

  const isDistress = status === 'distress_detected';

  return (
    <motion.span
      className={`relative flex h-3 w-3`}
      title={isDistress ? 'Distress detected!' : 'Voice monitoring active'}
    >
      <motion.span
        className={`absolute inset-0 rounded-full ${isDistress ? 'bg-red-500' : 'bg-teal-400'}`}
        animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <span
        className={`relative h-3 w-3 rounded-full ${isDistress ? 'bg-red-500' : 'bg-teal-400'}`}
      />
    </motion.span>
  );
}

// ── Full pill / banner ────────────────────────────────────────────────────────

export default function VoiceIndicator({
  status,
  error,
  onStart,
  onStop,
  compact = false,
}: VoiceIndicatorProps) {
  if (compact) return <CompactDot status={status} />;

  const isDistress = status === 'distress_detected';
  const isListening = status === 'listening';

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence mode="wait">
        {/* ── Distress Banner ── */}
        {isDistress && (
          <motion.div
            key="distress"
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-500/20 border border-red-500/40 backdrop-blur-sm"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              <FiAlertTriangle className="text-red-400" size={18} />
            </motion.span>
            <div>
              <p className="text-sm font-semibold text-red-300">Distress Detected</p>
              <p className="text-xs text-red-400/80">Emergency alert is being triggered…</p>
            </div>
          </motion.div>
        )}

        {/* ── Listening Pill ── */}
        {isListening && !isDistress && (
          <motion.div
            key="listening"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl glass border border-teal-400/20"
          >
            <WaveformBars />
            <span className="text-xs text-teal-300 font-medium flex-1">
              Listening for distress…
            </span>
            <button
              onClick={onStop}
              aria-label="Stop voice monitoring"
              className="text-xs text-sky-400/70 hover:text-rose-400 transition-colors"
            >
              <FiMicOff size={14} />
            </button>
          </motion.div>
        )}

        {/* ── Idle / Start button ── */}
        {status === 'idle' && (
          <motion.button
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onStart}
            className="flex items-center gap-2.5 px-4 py-3 rounded-2xl glass border border-white/[0.07] hover:border-teal-400/30 transition-colors text-left w-full group"
          >
            <span className="h-7 w-7 rounded-full bg-teal-500/15 flex items-center justify-center group-hover:bg-teal-500/25 transition-colors">
              <FiMic className="text-teal-400" size={14} />
            </span>
            <div>
              <p className="text-xs font-medium text-sky-100">Voice Monitoring</p>
              <p className="text-[11px] text-sky-400/60">
                Tap to enable distress detection
              </p>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Error message ── */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-rose-400/90 px-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
