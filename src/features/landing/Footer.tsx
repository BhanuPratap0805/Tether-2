import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import TetherMark from '../../components/common/TetherMark';

const columns = [
  {
    title: 'Product',
    links: ['Features', 'How it works', 'Pricing', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Safety guide', 'Guardian setup', 'Support', 'Status'],
  },
];

export default function Footer() {
  return (
    <footer className="relative px-6 pt-16 pb-8 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <TetherMark size={30} animated={false} />
            <span className="font-display text-lg text-sky-50">Tether</span>
          </div>
          <p className="mt-4 text-sm text-sky-300/70 max-w-xs leading-relaxed">
            Predict. Protect. Preserve. A quieter kind of safety, built for the moments that matter.
          </p>
          <div className="mt-5 flex items-center gap-3 text-sky-300/70">
            <a href="#" aria-label="Twitter" className="hover:text-sky-50 transition-colors"><FiTwitter size={16} /></a>
            <a href="#" aria-label="GitHub" className="hover:text-sky-50 transition-colors"><FiGithub size={16} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-sky-50 transition-colors"><FiLinkedin size={16} /></a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs uppercase tracking-[0.15em] text-sky-400/70 mb-4">{col.title}</p>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-sky-300/80 hover:text-sky-50 transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between gap-3 text-xs text-sky-400/60">
        <span>© {new Date().getFullYear()} Tether Technologies. Built for Team TuffCoders.</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-sky-200">Privacy</a>
          <a href="#" className="hover:text-sky-200">Terms</a>
        </div>
      </div>
    </footer>
  );
}
