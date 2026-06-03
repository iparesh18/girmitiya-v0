import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { activities } from '../data/siteData';

const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

const CATEGORY_PATHS = {
  'Root Search': '/root-search',
  'Empowerment': '/woman-empowerment',
  'Training': '/skill-development',
};

const STATS = [
  { label: 'Families Reconnected', value: '4,200+' },
  { label: 'Countries Reached', value: '10+' },
  { label: 'Active Programs', value: '3' },
  { label: 'Years of Service', value: '12+' },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const rise = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function Activity() {
  return (
    <>
      {/* ── Hero — dark ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-darker text-light pt-32 pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: NOISE_BG,
            backgroundRepeat: 'repeat',
            backgroundSize: '300px 300px',
            opacity: 0.04,
            mixBlendMode: 'overlay',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cultural-pattern opacity-[0.05]"
          style={{ backgroundSize: '24px 24px' }}
        />

        <div className="container-pad relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid items-end gap-12 lg:grid-cols-[1fr_320px]"
          >
            <div>
              <motion.span
                variants={rise}
                className="mb-8 inline-flex items-center gap-3 font-display text-base tracking-[0.2em] text-gold/60"
              >
                <span className="h-px w-8 bg-gold/35" />
                COMMUNITY WORK · ONGOING
              </motion.span>

              <div className="overflow-hidden">
                <motion.h1
                  variants={rise}
                  className="font-display leading-[0.84] tracking-tight whitespace-normal select-none sm:whitespace-nowrap"
                  style={{ fontSize: 'clamp(2.5rem, 9.5vw, 9rem)' }}
                >
                  <span className="text-light">ACTIVE </span>
                  <span style={{ WebkitTextStroke: '1.5px rgba(184,138,45,0.32)', color: 'transparent' }}>
                    PROGRAMS
                  </span>
                </motion.h1>
              </div>
            </div>

            <motion.div variants={rise} className="lg:pb-3">
              <p className="font-serif italic text-lg leading-relaxed text-gold/80">
                "Connecting cultural identity with social development, learning, welfare, and family support."
              </p>
              <p className="mt-4 text-sm leading-7 text-light/45">
                Our activity areas span heritage documentation, women's empowerment, skill building, and child welfare — each rooted in community dignity.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
            className="mt-14 h-px bg-gradient-to-r from-gold/30 via-white/10 to-transparent"
          />
        </div>
      </section>

      {/* ── Stats strip — warm parchment ─────────────── */}
      <section className="bg-parchment border-y border-primary/12">
        <div className="container-pad py-10">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {STATS.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="border-primary/12 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-none"
              >
                <p
                  className="font-display leading-none text-primary"
                  style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)' }}
                >
                  {value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-earth/60">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Indexed activity list — cream light ───────── */}
      <section className="bg-cream">
        <div className="container-pad">
          <div className="pt-14 pb-3">
            <span className="font-display text-base tracking-[0.2em] text-ink/30">WHAT WE DO</span>
          </div>

          <div className="border-t border-ink/10" />

          {activities.map((item, i) => {
            const Icon = item.icon;
            const path = CATEGORY_PATHS[item.category] ?? '/activity';

            return (
              <Link
                key={item.title}
                to={path}
                className="group relative flex items-center gap-6 overflow-hidden border-b border-ink/10 py-10 transition-colors duration-300 hover:bg-primary/5 lg:gap-12"
              >
                {/* Hover image reveal */}
                <div className="pointer-events-none absolute right-0 top-0 h-full w-64 opacity-0 transition-opacity duration-500 group-hover:opacity-100 xl:w-80">
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-l from-[#fff7e6]/10 via-[#fff7e6]/65 to-[#fff7e6]" />
                </div>

                {/* Ghost number */}
                <span
                  aria-hidden="true"
                  className="relative z-10 hidden font-display leading-none text-ink/8 transition-colors duration-300 group-hover:text-primary/15 sm:block"
                  style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon badge */}
                <div className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary/18 group-hover:text-saffron">
                  <Icon size={20} />
                </div>

                {/* Content */}
                <div className="relative z-10 min-w-0 flex-1">
                  <span className="mb-2.5 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-all duration-300 group-hover:bg-primary/18">
                    {item.category}
                  </span>
                  <h2
                    className="font-display leading-tight text-ink transition-colors duration-300 group-hover:text-primary"
                    style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
                  >
                    {item.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-earth/70">{item.text}</p>
                </div>

                {/* Arrow */}
                <div className="relative z-10 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/12 text-ink/25 transition-all duration-300 group-hover:translate-x-1 group-hover:border-primary/50 group-hover:text-primary sm:flex">
                  <ArrowUpRight size={18} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── CTA — rich maroon ────────────────────────── */}
      <section className="relative overflow-hidden bg-primary py-24 text-cream">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: NOISE_BG,
            backgroundRepeat: 'repeat',
            backgroundSize: '300px 300px',
            opacity: 0.06,
            mixBlendMode: 'overlay',
          }}
        />
        {/* subtle dot pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,247,230,0.4) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="container-pad relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-display text-base tracking-[0.2em] text-cream/50">TAKE ACTION</span>
                <h2 className="font-display leading-tight text-cream" style={{ fontSize: 'clamp(2.2rem, 5vw, 4.2rem)' }}>
                  READY TO JOIN THE MOVEMENT?
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/membership"
                className="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold tracking-wide text-primary transition-all duration-300 hover:scale-105 hover:bg-light"
              >
                Become a Member
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold tracking-wide text-cream transition-all duration-300 hover:border-cream/70 hover:bg-cream/10"
              >
                Get in Touch
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
