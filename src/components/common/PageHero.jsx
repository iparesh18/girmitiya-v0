import { motion } from 'framer-motion';

const NOISE_BG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const rise = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function PageHero({
  eyebrow,
  line1,
  line2,
  quote,
  description,
  size = 'clamp(3rem, 10vw, 9.5rem)',
}) {
  const hasRight = quote || description;
  return (
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
          className={`grid items-end gap-12 ${hasRight ? 'lg:grid-cols-[1fr_300px]' : ''}`}
        >
          <div>
            <motion.span
              variants={rise}
              className="mb-8 inline-flex items-center gap-3 font-display text-base tracking-[0.2em] text-gold/60"
            >
              <span className="h-px w-8 bg-gold/35" />
              {eyebrow}
            </motion.span>

            <div className="overflow-hidden">
              <motion.h1
                variants={rise}
                className="font-display leading-[0.84] tracking-tight whitespace-nowrap select-none"
                style={{ fontSize: size }}
              >
                <span className="text-light">{line1} </span>
                <span
                  style={{
                    WebkitTextStroke: '1.5px rgba(184,138,45,0.32)',
                    color: 'transparent',
                  }}
                >
                  {line2}
                </span>
              </motion.h1>
            </div>
          </div>

          {hasRight && (
            <motion.div variants={rise} className="lg:pb-3">
              {quote && (
                <p className="font-serif italic text-lg leading-relaxed text-gold/80">
                  "{quote}"
                </p>
              )}
              {description && (
                <p className={`text-sm leading-7 text-light/45 ${quote ? 'mt-4' : ''}`}>
                  {description}
                </p>
              )}
            </motion.div>
          )}
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
  );
}
