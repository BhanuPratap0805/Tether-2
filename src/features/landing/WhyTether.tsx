import { motion } from 'framer-motion';
import Card from '../../components/common/Card';

const reasons = [
  { stat: '<2s', label: 'to raise an alert', detail: 'From trigger to guardian notification, even on a weak connection.' },
  { stat: '100%', label: 'on-device first read', detail: 'Initial risk scoring happens locally before anything leaves your phone.' },
  { stat: '0', label: 'accounts required to help', detail: 'A guardian can view a shared alert link without installing anything.' },
];

export default function WhyTether() {
  return (
    <section id="why-tether" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs tracking-[0.2em] uppercase text-teal-400">Why Tether</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium text-sky-50 tracking-tight">
            Built to feel like an open sky, not a locked room.
          </h2>
          <p className="mt-5 text-sm sm:text-base text-sky-300/80 leading-relaxed max-w-md">
            Most safety apps read like alarms — sirens, red, urgent by default. Tether is
            built the opposite way: calm until it truly needs to speak, so when it does,
            you and your guardians actually listen.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-4">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="flex items-center gap-5">
                <span className="font-display text-3xl sm:text-4xl text-teal-400">{reason.stat}</span>
                <div>
                  <p className="text-sm font-medium text-sky-50">{reason.label}</p>
                  <p className="text-xs text-sky-300/70 mt-0.5">{reason.detail}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
