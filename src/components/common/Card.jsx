import { motion } from 'framer-motion';

export default function Card({ children, className = '', id }) {
  return (
    <motion.div
      id={id}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
      className={`rounded-[1.6rem] border border-primary/12 bg-grey/70 p-6 shadow-premium backdrop-blur transition-all duration-300 hover:border-primary/24 ${className}`}
    >
      {children}
    </motion.div>
  );
}
