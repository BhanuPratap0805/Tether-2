import { motion } from 'framer-motion';
import { FiActivity, FiBellOff, FiEye, FiMapPin, FiShield, FiUsers } from 'react-icons/fi';
import Card from '../../components/common/Card';

const features = [
  {
    icon: FiActivity,
    title: 'Predictive risk reading',
    description: 'Learns your ordinary routes and routines so it can notice, quietly, when something looks out of place.',
  },
  {
    icon: FiShield,
    title: 'Encrypted evidence capture',
    description: 'Audio and location are sealed the moment a risk is flagged — untouched, timestamped, ready if ever needed.',
  },
  {
    icon: FiMapPin,
    title: 'Live location tethering',
    description: 'Your position streams to the people you trust in real time, with no manual sharing steps mid-crisis.',
  },
  {
    icon: FiUsers,
    title: 'Guardian circle',
    description: 'Add the people who should hear from you first — family, roommates, a friend two streets away.',
  },
  {
    icon: FiBellOff,
    title: 'Offline SMS fallback',
    description: 'No signal, no problem. Alerts drop to SMS automatically so your circle still hears from you.',
  },
  {
    icon: FiEye,
    title: 'Always-on, never loud',
    description: 'Runs in the background without demanding attention — safety that stays out of your way until it matters.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-14"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-teal-400">What Tether does</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium text-sky-50 tracking-tight">
            Six quiet systems, one open sky.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Card interactive className="h-full">
                <div className="h-11 w-11 rounded-2xl bg-teal-500/15 text-teal-400 flex items-center justify-center mb-4">
                  <feature.icon size={20} />
                </div>
                <h3 className="text-lg font-medium text-sky-50">{feature.title}</h3>
                <p className="mt-2 text-sm text-sky-300/80 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
