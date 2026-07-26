import { motion } from 'framer-motion';

const frames = [
  { label: 'Dashboard', tone: '#1E3547' },
  { label: 'Live map', tone: '#16283A' },
  { label: 'Guardian circle', tone: '#1B3244' },
];

export default function Screenshots() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-12"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-teal-400">Inside the app</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium text-sky-50 tracking-tight">
            A product you'll actually want to open.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {frames.map((frame, i) => (
            <motion.div
              key={frame.label}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="glass rounded-[var(--radius-xl2)] p-3"
            >
              <div
                className="rounded-2xl aspect-[9/16] flex flex-col items-center justify-center gap-3 relative overflow-hidden"
                style={{ background: frame.tone }}
              >
                <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full opacity-40">
                  <ellipse cx="40" cy="30" rx="60" ry="18" fill="#7FA8C9" />
                  <ellipse cx="150" cy="70" rx="70" ry="20" fill="#4FA89B" />
                </svg>
                <span className="relative text-xs font-mono tracking-wider text-sky-200/80 glass-light px-3 py-1 rounded-full">
                  {frame.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
