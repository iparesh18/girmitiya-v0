import { Archive, Map, Search, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import PageHero from '../components/common/PageHero';
import { timeline } from '../data/siteData';

export default function RootSearch() {
  return (
    <>
      <PageHero
        eyebrow="HERITAGE · ANCESTRY"
        line1="ROOT"
        line2="SEARCH"
        size="clamp(3rem, 11vw, 10.5rem)"
        quote="A careful journey back to names, villages, records, and belonging."
        description="Root Search supports Girmitiya descendants as they organize family clues, preserve oral histories, and begin archival exploration with patience and respect."
      />

      {/* Search form + context */}
      <section className="bg-cream py-20">
        <div className="container-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[1.6rem] border border-primary/12 bg-parchment p-7 shadow-premium"
          >
            <Search className="text-primary" size={32} />
            <h2 className="mt-5 font-display text-3xl text-primary">Begin Your Search</h2>
            <p className="mt-3 leading-7 text-earth/75">
              Share whatever your family knows. Even a partial name, village, ship memory, or document can become a starting point.
            </p>
            <form className="mt-6 grid gap-4">
              {[
                'Ancestor name or family surname',
                'Known village / district',
                'Country of settlement',
                'Contact email',
              ].map((label) => (
                <input
                  key={label}
                  className="rounded-2xl border border-primary/18 bg-white px-4 py-3 text-ink placeholder:text-earth/45 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                  placeholder={label}
                />
              ))}
              <textarea
                rows="4"
                className="resize-none rounded-2xl border border-primary/18 bg-white px-4 py-3 text-ink placeholder:text-earth/45 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="Tell us the story or clues you have…"
              />
              <Button type="button" icon={Send}>Submit Root Search Request</Button>
            </form>
          </motion.div>

          {/* Context */}
          <div>
            <div className="mb-8">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-display text-base tracking-[0.2em] text-ink/28">HISTORICAL RECONNECT</span>
                <h2 className="font-display leading-tight text-primary" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
                  The search is archival, emotional, and communal.
                </h2>
              </div>
              <p className="mt-4 leading-8 text-earth/70">
                It combines family testimony, historical records, public archives, and community memory. The foundation helps families frame the journey with care instead of rushing fragile histories.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Document Clues', 'Names, passes, ship details, letters, old photographs, and migration stories.', Archive],
                ['Place Memory', 'Village names, temples, districts, songs, rituals, foods, and spoken fragments.', Map],
              ].map(([title, text, Icon]) => (
                <div
                  key={title}
                  className="rounded-[1.4rem] border border-primary/12 bg-parchment p-5 transition-all duration-300 hover:border-primary/28 hover:shadow-premium"
                >
                  <Icon className="text-primary" size={22} />
                  <h3 className="mt-4 font-display text-2xl text-primary">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-earth/75">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline — parchment */}
      <section className="bg-parchment py-20">
        <div className="container-pad">
          <div className="mb-10 flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <span className="font-display text-base tracking-[0.2em] text-ink/28">TIMELINE</span>
            <h2 className="font-display leading-tight text-primary" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              From historical rupture to cultural reconnection.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {timeline.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-[1.4rem] border border-primary/12 bg-cream p-5 transition-all duration-300 hover:shadow-premium"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary font-display text-lg text-cream">
                  {i + 1}
                </span>
                <p className="mt-5 font-display text-sm uppercase tracking-[0.22em] text-saffron">{item.year}</p>
                <h3 className="mt-2 font-display text-2xl text-primary">{item.title}</h3>
                <p className="mt-3 leading-7 text-earth/70">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
