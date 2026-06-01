import Card from './common/Card';
import Button from './common/Button';
import Reveal from './common/Reveal';

export default function ActivityCard({ item, to = '/activity' }) {
  const Icon = item.icon;
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative overflow-hidden">
        <img src={item.image} alt={item.title} loading="lazy" className="h-60 w-full object-cover transition duration-700 hover:scale-110" />
        <span className="absolute left-5 top-5 rounded-full bg-dark/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-light/90">
          {item.category}
        </span>
      </div>
      <div className="p-6">
        <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-primary/15 text-saffron">
          <Icon />
        </div>
        <Reveal as="h3" className="font-display text-2xl font-bold text-light text-balance">
          {item.title}
        </Reveal>
        <p className="mt-3 leading-7 text-light/80">{item.text}</p>
        <Button to={to} variant="ghost" className="mt-5 px-4 py-2">Learn More</Button>
      </div>
    </Card>
  );
}
