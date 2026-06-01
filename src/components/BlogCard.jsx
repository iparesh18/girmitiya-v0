import { CalendarDays } from 'lucide-react';
import Card from './common/Card';
import Reveal from './common/Reveal';

export default function BlogCard({ post }) {
  return (
    <Card className="overflow-hidden border border-primary/10 bg-white/90 p-0 text-earth shadow-[0_18px_40px_rgba(95,59,36,0.12)]">
      <div className="overflow-hidden">
        <img src={post.image} alt={post.title} loading="lazy" className="h-56 w-full object-cover transition duration-700 hover:scale-110" />
      </div>
      <div className="p-6">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          {post.category}
        </span>
        <Reveal as="h3" className="mt-4 font-display text-2xl font-bold text-primary text-balance">
          {post.title}
        </Reveal>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-earth/80">{post.excerpt}</p>
        <p className="mt-5 flex items-center gap-2 text-xs font-semibold text-earth/60">
          <CalendarDays size={16} /> {post.date}
        </p>
      </div>
    </Card>
  );
}
