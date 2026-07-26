import { motion } from 'framer-motion';
import Card from '../../components/common/Card';
import { initials } from '../../utils/format';

const testimonials = [
  {
    quote: 'I forget it is even running until it quietly checks in on me after a late shift. That is exactly how safety software should feel.',
    name: 'Ishita Verma',
    role: 'Night-shift nurse, Gurugram',
  },
  {
    quote: 'My parents finally stopped calling every twenty minutes when I travel — they just open the guardian link instead.',
    name: 'Rohan Malhotra',
    role: 'Graduate student',
  },
  {
    quote: 'The offline SMS fallback is the detail that sold me. Signal drops in my building all the time.',
    name: 'Ayesha Khan',
    role: 'Product designer',
  },
];

export default function Testimonials() {
  return (
    <section id="stories" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="max-w-xl mb-12"
        >
          <span className="text-xs tracking-[0.2em] uppercase text-teal-400">Early users</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-medium text-sky-50 tracking-tight">
            Quiet trust, from people who needed it.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="h-full flex flex-col justify-between">
                <p className="text-sm text-sky-100 leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="h-9 w-9 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-xs font-medium">
                    {initials(t.name)}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-sky-50">{t.name}</p>
                    <p className="text-xs text-sky-300/70">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
