import { motion } from 'framer-motion';
import { values } from '../data/siteData';
import PageHero from '../components/common/PageHero';

export default function Mission() {
  return (
    <>
      <PageHero
        eyebrow="VALUES · PURPOSE"
        line1="OUR"
        line2="MISSION"
        size="clamp(3rem, 11vw, 10.5rem)"
        quote="Preserve roots. Strengthen lives. Inspire future generations."
        description="Our mission is both cultural and practical: reconnect Girmitiya descendants with heritage while creating development programs that improve everyday life."
      />

      <section className="bg-cream py-20">
        <div className="container-pad">
          <div className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <span className="font-display text-base tracking-[0.2em] text-ink/28">HOW WE WORK</span>
            <h2 className="font-display leading-tight text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              Principles that shape every program.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.4rem] border border-primary/12 bg-parchment p-6 transition-all duration-300 hover:border-primary/28 hover:shadow-premium"
                >
                  <Icon className="text-primary" size={22} />
                  <h3 className="mt-4 font-display text-2xl text-primary">{item.title}</h3>
                  <p className="mt-3 leading-7 text-earth/75">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
