import { motion } from 'framer-motion';

export default function PageHeader({ eyebrow, title, text, image, eyebrowClassName = 'bg-saffron text-light' }) {
  return (
    <section className="relative overflow-hidden pb-16 pt-32 sm:pt-36">
      <div className="absolute inset-0 pattern-band" />
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute right-0 top-0 h-full w-1/2 object-cover opacity-20 mix-blend-multiply"
        />
      )}
      <div className="container-pad relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] ${eyebrowClassName}`}>
            {eyebrow}
          </span>
          <h1 className="mt-6 text-balance font-display text-[clamp(3rem,6vw,4.5rem)] font-bold leading-[1.04] text-primary">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-[1.8] text-earth/80">{text}</p>
        </motion.div>
      </div>
    </section>
  );
}
