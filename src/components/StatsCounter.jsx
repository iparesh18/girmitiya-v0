import { stats } from '../data/siteData';
import { useCounter } from '../hooks/useCounter';
import AnimatedContainer from './common/AnimatedContainer';
import Counter from './common/Counter';

function getPlaces(value) {
  const safeValue = Math.max(0, Math.floor(value));
  const digits = Math.max(1, Math.floor(Math.log10(safeValue || 1)) + 1);
  return Array.from({ length: digits }, (_, index) => 10 ** (digits - index - 1));
}

function Stat({ item }) {
  const { ref, count } = useCounter(item.value);
  const places = getPlaces(item.value);
  return (
    <div ref={ref} className="rounded-3xl border border-primary/12 bg-white/75 p-6 text-center shadow-premium">
      <div className="flex items-baseline justify-center gap-1">
        <Counter
          value={count}
          places={places}
          fontSize={36}
          padding={6}
          gap={2}
          textColor="#7f1d1d"
          fontWeight={800}
          gradientFrom="rgba(255,255,255,0.85)"
          gradientTo="transparent"
        />
        {item.suffix && <span className="font-display text-2xl font-bold text-primary">{item.suffix}</span>}
      </div>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-earth/70">{item.label}</p>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <AnimatedContainer className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {stats.map((item) => (
        <Stat key={item.label} item={item} />
      ))}
    </AnimatedContainer>
  );
}
