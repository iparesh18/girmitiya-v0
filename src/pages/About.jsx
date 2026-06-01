import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { values } from '../data/siteData';
import PageHero from '../components/common/PageHero';

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="WHO WE ARE · SINCE 2012"
        line1="ABOUT"
        line2="US"
        size="clamp(3.5rem, 12vw, 11.5rem)"
        quote="A foundation rooted in heritage and public service."
        description="Girmitiya Foundation preserves the memory of indentured migration and converts that memory into practical programs for community dignity, education, livelihoods, and care."
      />

      {/* Our Story */}
      <section className="bg-cream py-20">
        <div className="container-pad grid gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <span className="font-display text-base tracking-[0.2em] text-ink/28">OUR STORY</span>
              <h2 className="font-display leading-tight text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                We believe cultural memory can become a force for healing.
              </h2>
            </div>
            <p className="mt-5 leading-8 text-earth/75">
              The foundation brings together descendants, researchers, volunteers, and social workers to document heritage, reconnect families, and support vulnerable communities through well-designed grassroots initiatives.
            </p>
            <p className="mt-4 leading-8 text-earth/60">
              Every program we run starts with listening — to families, to elders, to the communities who carry history in their daily lives. That attention shapes our approach to both cultural work and social development.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.slice(0, 4).map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.4rem] border border-primary/12 bg-parchment p-5 transition-all duration-300 hover:border-primary/28 hover:shadow-premium"
                >
                  <Icon className="text-primary" size={22} />
                  <h3 className="mt-4 font-display text-2xl text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-earth/75">{item.text}</p>
                </motion.div>
              );
            })}
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
              <span className="font-display text-base tracking-[0.2em] text-cream/45">GET INVOLVED</span>
              <h2 className="font-display leading-tight text-cream" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.8rem)' }}>
                STAND WITH THE STORY.
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/membership"
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-primary transition-all duration-300 hover:scale-105 hover:bg-light"
            >
              Join the Foundation <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:border-cream/70 hover:bg-cream/10"
            >
              Contact Us <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
