import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageHero from '../components/common/PageHero';
import { images } from '../data/siteData';

const content = {
  women: {
    eyebrow: 'WOMEN EMPOWERMENT · PROGRAM',
    line1: 'WOMEN',
    line2: 'EMPOWER',
    size: 'clamp(3rem, 10vw, 9.5rem)',
    image: images.women,
    quote: 'Women-led confidence, livelihood, and dignity programs.',
    description: 'The foundation supports women through awareness circles, practical learning, mentorship, financial literacy, and livelihood-linked training.',
    sectionLabel: 'PROGRAM DESIGN',
    sectionTitle: 'Focused, community-led, and practical.',
    sectionText: 'Every initiative is designed with local participation, clear outcomes, and the sensitivity needed for community trust.',
    points: [
      'Self-help and support circles',
      'Rights and health awareness sessions',
      'Financial literacy and micro-enterprise learning',
      'Leadership conversations with mentors',
    ],
  },
  skill: {
    eyebrow: 'SKILL DEVELOPMENT · PROGRAM',
    line1: 'SKILL',
    line2: 'BUILD',
    size: 'clamp(3.5rem, 12vw, 11rem)',
    image: images.skill,
    quote: 'Skills that turn aspiration into daily opportunity.',
    description: 'Skill programs focus on employability, digital confidence, communication, entrepreneurship, and practical community training.',
    sectionLabel: 'PROGRAM DESIGN',
    sectionTitle: 'Practical skills for real opportunity.',
    sectionText: 'Every initiative is designed with local participation, clear outcomes, and the sensitivity needed for community trust.',
    points: [
      'Digital basics and online safety',
      'Career readiness and communication',
      'Small enterprise and bookkeeping basics',
      'Youth mentorship and placement guidance',
    ],
  },
  child: {
    eyebrow: 'CHILD WELFARE · PROGRAM',
    line1: 'CHILD',
    line2: 'WELFARE',
    size: 'clamp(3rem, 10vw, 9.5rem)',
    image: images.child,
    quote: 'Safe, joyful, and supportive spaces for children.',
    description: 'Child welfare initiatives promote education support, nutrition awareness, safety, creativity, and family-centered care.',
    sectionLabel: 'PROGRAM DESIGN',
    sectionTitle: 'Care that begins with the child.',
    sectionText: 'Every initiative is designed with local participation, clear outcomes, and the sensitivity needed for community trust.',
    points: [
      'Learning kits and education support',
      'Nutrition and hygiene awareness',
      'Creative sessions and reading circles',
      'Protection awareness for families',
    ],
  },
};

export default function ProgramPage({ type }) {
  const page = content[type];
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        line1={page.line1}
        line2={page.line2}
        size={page.size}
        quote={page.quote}
        description={page.description}
      />

      <section className="bg-cream py-20">
        <div className="container-pad grid items-center gap-12 lg:grid-cols-2">
          <motion.img
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            src={page.image}
            alt={page.line1}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-premium"
          />

          <div>
            <div className="mb-8">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-display text-base tracking-[0.2em] text-ink/28">{page.sectionLabel}</span>
                <h2 className="font-display leading-tight text-primary" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                  {page.sectionTitle}
                </h2>
              </div>
              <p className="mt-3 leading-7 text-earth/70">{page.sectionText}</p>
            </div>

            <div className="grid gap-3">
              {page.points.map((point, i) => (
                <motion.div
                  key={point}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 rounded-2xl border border-primary/12 bg-parchment px-5 py-3.5 transition-all duration-300 hover:border-primary/28"
                >
                  <CheckCircle2 className="shrink-0 text-primary" size={18} />
                  <span className="text-sm font-semibold text-ink">{point}</span>
                </motion.div>
              ))}
            </div>

            <Link
              to="/contact"
              className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-cream transition-all duration-300 hover:scale-105 hover:bg-earth"
            >
              Partner With This Program
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
