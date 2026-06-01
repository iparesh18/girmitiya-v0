import { BookOpen, Download, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import PageHero from '../components/common/PageHero';

export default function Publication() {
  const publications = [
    {
      title: 'Root Search Guide',
      text: 'A beginner-friendly guide for families preparing documents and oral history clues.',
      Icon: BookOpen,
    },
    {
      title: 'Girmitiya Heritage Notes',
      text: 'Short research notes on memory, culture, migration, and community identity.',
      Icon: FileText,
    },
    {
      title: 'Community Impact Report',
      text: 'A transparent annual summary of programs, activities, partners, and learning.',
      Icon: FileText,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="RESEARCH · PUBLIC LEARNING"
        line1="RESEARCH"
        line2="& RECORDS"
        size="clamp(2rem, 7.5vw, 7rem)"
        description="Our publication work translates heritage research and field learning into accessible resources for the community."
      />

      <section className="bg-cream py-20">
        <div className="container-pad">
          <div className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <span className="font-display text-base tracking-[0.2em] text-ink/28">RESOURCES</span>
            <h2 className="font-display leading-tight text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Documents that support memory and action.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {publications.map(({ title, text, Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[1.4rem] border border-primary/12 bg-parchment p-6 transition-all duration-300 hover:border-primary/28 hover:shadow-premium"
              >
                <Icon className="text-primary" size={24} />
                <h3 className="mt-5 font-display text-2xl text-primary">{title}</h3>
                <p className="mt-3 leading-7 text-earth/75">{text}</p>
                <Button to="/root-search" variant="ghost" className="mt-6" icon={Download}>
                  View Resource
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
