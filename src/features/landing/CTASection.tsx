import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import TetherMark from '../../components/common/TetherMark';

export default function CTASection() {
  return (
    <section className="relative py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto glass rounded-[var(--radius-xl3)] p-10 sm:p-14 text-center"
      >
        <div className="flex justify-center mb-6">
          <TetherMark size={48} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-medium text-sky-50 tracking-tight">
          Your circle is one tap away.
        </h2>
        <p className="mt-4 text-sm sm:text-base text-sky-300/80 max-w-md mx-auto">
          Set up your guardians in under two minutes. No credit card, no commitment —
          just a quieter kind of watchfulness.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/login">
            <Button size="lg" icon={<FiArrowRight />} iconPosition="right">
              Start your tether
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
