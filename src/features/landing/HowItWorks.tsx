import { motion } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'You move, Tether listens',
    description: 'Location, motion, and pace are read continuously in the background — light on battery, lighter on attention.',
  },
  {
    step: '02',
    title: 'A pattern breaks, risk rises',
    description: 'When something deviates from your normal — an unfamiliar route, an unusual stop — the risk score updates in real time.',
  },
  {
    step: '03',
    title: 'Evidence starts recording',
    description: 'Past a threshold, encrypted audio and location capture begin automatically, before you ever have to reach for your phone.',
  },
  {
    step: '04',
    title: 'Your circle is tethered in',
    description: 'Guardians receive your live location and a status update — over data, or SMS the moment signal drops.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-14"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-teal-400">How it works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium text-sky-50 tracking-tight">
            One continuous thread, four moments.
          </h2>
        </motion.div>

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[9px] sm:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-400/70 via-sky-300/40 to-transparent" />
          <div className="flex flex-col gap-10">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <span className="absolute -left-8 sm:-left-10 top-1 h-[19px] w-[19px] rounded-full bg-dusk-900 border-2 border-teal-400 flex items-center justify-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                </span>
                <p className="font-mono text-xs text-teal-400/80 mb-1">{item.step}</p>
                <h3 className="text-xl font-medium text-sky-50">{item.title}</h3>
                <p className="mt-1.5 text-sm text-sky-300/80 leading-relaxed max-w-lg">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
