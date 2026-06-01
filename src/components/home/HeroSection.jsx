import { motion } from 'framer-motion';
import Button from '../common/Button';
import EarthModel from './EarthModel';

const easing = [0.2, 0.15, 0.08, 0.3];

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full bg-[#FFFBF2]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_right,_rgba(212,160,23,0.06),transparent_18%),radial-gradient(ellipse_at_center,_rgba(0,0,0,0.02),transparent_60%)]" />

      <div className="container-pad h-full flex items-center">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid h-full grid-cols-1 items-center gap-8 lg:grid-cols-2">

            {/* Left column - minimal content */}
            <div className="order-2 mt-6 lg:order-1 lg:mt-0">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: easing }}>
                <p className="mb-6 text-xs font-semibold tracking-widest text-earth/60">GLOBAL CULTURAL FOUNDATION</p>
                <h2 className="text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-ink" style={{ fontFamily: '"Bebas Neue", sans-serif' }}>Girmitiya.</h2>
                <p className="mt-4 max-w-[420px] text-[16px] leading-7 text-earth/80">Connecting history with the future.</p>
                <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease: easing }} className="mt-6 max-w-[420px] text-[15px] leading-7 text-earth/76">
                  Preserving cultural heritage, supporting communities, and creating lasting impact across generations.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: easing }} className="mt-8 flex gap-3">
                  <Button to="/work" className="rounded-full border border-[#D4A017] bg-earth px-5 py-3 text-sm font-semibold text-ink hover:bg-[#FFF7E6] transition">Explore Our Work</Button>
                  <Button to="/membership" className="rounded-full border border-neutral-200 bg-[#D4A017] px-5 py-3 text-sm font-semibold text-ink hover:bg-neutral-50 transition">Become a Member</Button>
                </motion.div>

              </motion.div>
            </div>

            {/* Right column - EarthModel */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 1.1, ease: easing }} className="relative flex h-[72vh] w-[72vh] max-w-[54vw] translate-y-10 items-center justify-center lg:translate-y-16">
                <div className="absolute -right-8 -left-8 top-0 bottom-0 -z-10 rounded-full bg-[radial-gradient(circle_at_center,_rgba(212,160,23,0.08),transparent_40%)]" />
                <div className="relative z-10 h-full w-full">
                  <div className="h-full w-full">
                    <EarthModel />
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* Bottom micro text */}
          <div className="pointer-events-none absolute left-0 bottom-6 w-full text-sm text-earth/60">
            <div className="container-pad flex items-center justify-between">
              <span className="text-xs">Since 2016</span>
              <span className="text-xs">Heritage • Community • Impact</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
