import CTASection from './CTASection';
import Features from './Features';
import Footer from './Footer';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import LandingNavbar from './LandingNavbar';
import Screenshots from './Screenshots';
import Testimonials from './Testimonials';
import WhyTether from './WhyTether';

export default function LandingPage() {
  return (
    <div className="relative">
      <LandingNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      <WhyTether />
      <Screenshots />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
