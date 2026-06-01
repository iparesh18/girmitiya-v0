import { CheckCircle2 } from 'lucide-react';
import Card from './common/Card';
import Button from './common/Button';
import Reveal from './common/Reveal';

export default function MembershipCard({ id, title, price, description, benefits, highlighted }) {
  return (
    <Card id={id} className={`relative ${highlighted ? 'bg-primary border-primary/20 text-light shadow-glow' : 'bg-white/70 border-primary/12 text-earth'}`}>
      {highlighted && (
        <span className="absolute right-6 top-6 rounded-full bg-saffron px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-light">
          Popular
        </span>
      )}
      <Reveal as="h3" className={`font-display text-3xl font-bold text-balance ${highlighted ? 'text-light' : 'text-primary'}`}>
        {title}
      </Reveal>
      <p className={`mt-3 leading-7 ${highlighted ? 'text-light/80' : 'text-earth/80'}`}>{description}</p>
      <Reveal as="p" className={`mt-6 font-display text-5xl font-bold text-balance ${highlighted ? 'text-saffron' : 'text-primary'}`} delay={0.05}>
        {price}
      </Reveal>
      <ul className="mt-7 grid gap-3">
        {benefits.map((benefit) => (
          <li key={benefit} className={`flex gap-3 ${highlighted ? 'text-light/90' : 'text-earth/80'}`}>
            <CheckCircle2 className={`mt-0.5 shrink-0 ${highlighted ? 'text-saffron' : 'text-primary'}`} size={19} />
            {benefit}
          </li>
        ))}
      </ul>
      <Button to="/contact" variant={highlighted ? 'secondary' : 'primary'} className="mt-8 w-full">
        Join Membership
      </Button>
    </Card>
  );
}
