import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

export default function Hero() {
  return (
    <section className="relative pt-40 pb-28 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass-light px-4 py-1.5 text-xs text-sky-200 tracking-wide"
        >
          <FiMapPin size={13} className="text-teal-400" />
          A calm kind of vigilance
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-7 text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.05] text-sky-50"
        >
          Never walk
          <br />
          <span className="text-gradient-sky">unaccompanied</span> again.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-sky-200/85 leading-relaxed"
        >
          Tether is a digital rope back to safety — quietly reading the signs of a risky
          moment, keeping evidence and location ready, and pulling your circle in the moment
          you need them most.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link to="/login">
            <Button size="lg" icon={<FiArrowRight />} iconPosition="right">
              Start your tether
            </Button>
          </Link>
          <a href="#how-it-works">
            <Button size="lg" variant="secondary">See how it works</Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 mx-auto max-w-3xl glass rounded-[var(--radius-xl3)] p-3"
        >
          <div className="rounded-[1.4rem] overflow-hidden bg-dusk-800 aspect-[16/9] flex items-center justify-center relative">
            <svg viewBox="0 0 400 225" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <rect width="400" height="225" fill="#16283A" />
              <path d="M0 150 Q100 120 200 145 T400 130" stroke="#3D6483" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M0 170 Q120 190 220 168 T400 175" stroke="#4FA89B" strokeWidth="1.6" fill="none" opacity="0.5" />
              <circle cx="205" cy="112" r="6" fill="#6FBFB2" />
              <circle cx="205" cy="112" r="14" fill="none" stroke="#6FBFB2" strokeWidth="1.5" opacity="0.4" />
              <path d="M205 112 C 230 90, 250 78, 278 60" stroke="#A9C7DE" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
              <circle cx="278" cy="60" r="4" fill="#EAF4FB" />
            </svg>
            <span className="absolute bottom-4 left-4 glass-light rounded-full px-3 py-1.5 text-[11px] font-mono text-sky-100">
              risk score · 24 / low
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
