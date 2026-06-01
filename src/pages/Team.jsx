import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { team } from '../data/siteData';
import PageHero from '../components/common/PageHero';

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="LEADERSHIP · COMMUNITY"
        line1="OUR"
        line2="TEAM"
        size="clamp(3.5rem, 12vw, 11.5rem)"
        description="Our team combines research, fieldwork, and compassion to preserve Girmitiya heritage and run dignified social programs."
      />

      <section className="bg-cream py-20">
        <div className="container-pad">
          <div className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <span className="font-display text-base tracking-[0.2em] text-ink/28">GUIDED BY SERVICE</span>
            <h2 className="font-display leading-tight text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Cultural responsibility and community care.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-[1.4rem] border border-primary/12 bg-parchment p-6 text-center transition-all duration-300 hover:border-primary/28 hover:shadow-premium"
              >
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-saffron to-primary font-display text-3xl text-light">
                  {member.name.split(' ').map((p) => p[0]).join('').slice(0, 2)}
                </div>
                <h3 className="mt-5 font-display text-2xl text-primary">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-saffron">{member.role}</p>
                <p className="mt-3 text-sm leading-7 text-earth/70">{member.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary py-20 text-cream">
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,247,230,0.4) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="container-pad relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="font-display text-base tracking-[0.2em] text-cream/45">JOIN THE MISSION</span>
              <h2 className="font-display leading-tight text-cream" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}>
                VOLUNTEER OR PARTNER WITH US.
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:bg-light"
            >
              Get in Touch <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
