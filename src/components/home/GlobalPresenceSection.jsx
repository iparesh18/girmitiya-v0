import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Globe2, MapPin, Users } from 'lucide-react';
import { useRef, useState } from 'react';
import { globalPresence } from '../../data/siteData';
import Button from '../common/Button';
import Card from '../common/Card';
import SectionHeading from '../common/SectionHeading';

const worldLandmasses = [
  'M104 176C82 152 82 108 116 82C152 54 205 66 222 108C240 152 212 214 168 230C138 242 116 214 104 176Z',
  'M506 102C606 54 760 70 852 124C914 160 948 220 936 280C926 330 882 362 828 348C780 336 748 286 704 274C646 256 584 276 556 318C530 358 484 314 486 240C488 188 470 124 506 102Z',
  'M956 356C990 340 1042 346 1054 388C1060 426 1006 442 968 428C940 418 930 372 956 356Z'
];

export default function GlobalPresenceSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' });
  const prefersReducedMotion = useReducedMotion();
  const [activeCountry, setActiveCountry] = useState(globalPresence[0]);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const tooltipCountry = hoveredCountry ?? activeCountry;
  const shouldAnimate = isInView && !prefersReducedMotion;
  const revealState = prefersReducedMotion ? 'visible' : isInView ? 'visible' : 'hidden';

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container-pad">
        <SectionHeading
          eyebrow="Where Our Roots Spread"
          title="Connecting descendants and preserving cultural identity worldwide."
          text="Our presence spans families and archives across continents." 
        />

        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border border-primary/20 bg-[#0e0b08] p-4 shadow-premium sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-saffron">
                Our Presence
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold text-light/70">
                <button className="rounded-full bg-white/15 px-4 py-2 text-light">Our Presence</button>
                <button className="rounded-full px-4 py-2 text-light/60">Global Connections</button>
              </div>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#14100c]">
              <motion.svg viewBox="0 0 1200 640" className="h-[360px] w-full" role="img" aria-label="Girmitiya diaspora world map">
                <defs>
                  <radialGradient id="worldGlow" cx="50%" cy="45%" r="70%">
                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.2" />
                    <stop offset="55%" stopColor="#7f1d1d" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#0e0b08" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="routeLine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#d97706" stopOpacity="0.15" />
                    <stop offset="50%" stopColor="#f4c267" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.15" />
                  </linearGradient>
                </defs>
                <rect width="1200" height="640" rx="36" fill="#120d0a" />
                <circle cx="600" cy="320" r="255" fill="url(#worldGlow)" />
                <g fill="none" stroke="rgba(255,247,230,0.08)" strokeWidth="2">
                  <ellipse cx="600" cy="320" rx="500" ry="200" />
                  <ellipse cx="600" cy="320" rx="420" ry="160" />
                  <path d="M100 320H1100" />
                  <path d="M600 130V510" />
                </g>
                <motion.g initial={prefersReducedMotion ? 'visible' : 'hidden'} animate={revealState}>
                  {worldLandmasses.map((path, index) => (
                    <motion.path
                      key={path}
                      d={path}
                      fill={index === 0 ? 'rgba(217,119,6,0.18)' : index === 1 ? 'rgba(255,247,230,0.1)' : 'rgba(127,29,29,0.18)'}
                      stroke="rgba(255,247,230,0.12)"
                      strokeWidth="2"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                          pathLength: 1,
                          opacity: 1,
                          transition: { duration: 0.8, ease: 'easeOut', delay: index * 0.08 }
                        }
                      }}
                    />
                  ))}
                </motion.g>

                {globalPresence.map((country, index) => {
                  const routePath = `M760 286 Q${(760 + country.x) / 2} ${Math.min(country.y, 286) - 120 - index * 4} ${country.x} ${country.y}`;
                  return (
                    <motion.path
                      key={`${country.country}-route`}
                      d={routePath}
                      fill="none"
                      stroke="url(#routeLine)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      variants={{
                        hidden: { pathLength: 0, opacity: 0 },
                        visible: {
                          pathLength: 1,
                          opacity: 1,
                          transition: { duration: 0.75, ease: 'easeOut', delay: 0.2 + index * 0.08 }
                        }
                      }}
                    />
                  );
                })}
              </motion.svg>

              {globalPresence.map((country, index) => {
                const isActive = activeCountry.country === country.country;
                const isHovered = hoveredCountry?.country === country.country;

                return (
                  <motion.button
                    key={country.country}
                    type="button"
                    aria-label={`View ${country.country}`}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
                    style={{ left: `${(country.x / 1200) * 100}%`, top: `${(country.y / 640) * 100}%` }}
                    initial={prefersReducedMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
                    animate={revealState === 'visible' ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.7, y: 10 }}
                    transition={{ duration: 0.55, delay: 0.24 + index * 0.08, type: 'spring', stiffness: 220, damping: 20 }}
                    onClick={() => setActiveCountry(country)}
                    onMouseEnter={() => setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    onFocus={() => setHoveredCountry(country)}
                    onBlur={() => setHoveredCountry(null)}
                  >
                    <span className={`absolute inset-0 rounded-full ${isActive ? 'bg-saffron/40' : 'bg-saffron/25'} ${shouldAnimate ? 'animate-ping' : ''}`} />
                    <span className={`absolute inset-1 rounded-full ${isActive ? 'bg-saffron/30' : 'bg-saffron/20'}`} />
                    <span className={`relative grid h-4 w-4 place-items-center rounded-full border border-light/70 bg-light text-[9px] font-black text-primary shadow-[0_0_0_8px_rgba(217,119,6,0.08)] transition ${isHovered || isActive ? 'scale-125' : ''}`}>
                      <MapPin size={10} aria-hidden="true" />
                    </span>
                  </motion.button>
                );
              })}

              <AnimatePresence>
                {tooltipCountry && (
                  <motion.div
                    key={tooltipCountry.country}
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="pointer-events-none absolute z-20 max-w-[16rem] rounded-2xl border border-saffron/30 bg-black/70 p-4 shadow-premium backdrop-blur"
                    style={{ left: `${Math.min((tooltipCountry.x / 1200) * 100 + 4, 78)}%`, top: `${Math.max((tooltipCountry.y / 640) * 100 - 18, 8)}%` }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-saffron">{tooltipCountry.flag} {tooltipCountry.country}</p>
                    <p className="mt-2 text-sm leading-6 text-light/80">{tooltipCountry.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {globalPresence.map((country) => {
                const isActive = activeCountry.country === country.country;
                return (
                  <button
                    key={country.country}
                    type="button"
                    onClick={() => setActiveCountry(country)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${isActive ? 'border-saffron/50 bg-saffron/20 text-light' : 'border-white/10 bg-white/5 text-light/70 hover:text-light'}`}
                  >
                    <span className="mr-2">{country.flag}</span>
                    {country.country}
                  </button>
                );
              })}
            </div>
          </div>

          <Card className="flex h-full flex-col justify-between bg-[#15100c] p-7 text-light shadow-premium">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-saffron">
                <Globe2 size={14} /> Featured Country
              </span>
              <div className="mt-6 flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-full bg-white/10 text-3xl">
                  {activeCountry.flag}
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-light">{activeCountry.country}</h3>
                  <p className="text-sm uppercase tracking-[0.26em] text-light/50">Community presence</p>
                </div>
              </div>
              <p className="mt-5 text-[16px] leading-[1.7] text-light/85">{activeCountry.description}</p>

              <div className="mt-6 grid gap-4 border-t border-white/10 pt-5 text-sm">
                <p className="flex items-start gap-3 text-light/80"><Users size={16} className="mt-1 text-saffron" /> {activeCountry.presence}</p>
                <p className="flex items-start gap-3 text-light/80"><MapPin size={16} className="mt-1 text-saffron" /> {activeCountry.activities}</p>
              </div>
            </div>
            <Button to={activeCountry.learnMore} variant="secondary" className="mt-8 self-start bg-white text-maroon hover:bg-saffron hover:text-white" icon={ArrowRight}>
              View Details
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}