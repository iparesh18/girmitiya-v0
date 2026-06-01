import { Search } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import Button from '../components/common/Button';
import Reveal from '../components/common/Reveal';
import PageHero from '../components/common/PageHero';
import { blogs } from '../data/siteData';

export default function Blog() {
  const categories = ['All', 'Heritage', 'Empowerment', 'Skill Development', 'Child Welfare'];
  return (
    <>
      <PageHero
        eyebrow="COMMUNITY VOICES · STORIES"
        line1="BLOG"
        line2="& IDEAS"
        size="clamp(3rem, 10.5vw, 10rem)"
        description="Stories, research notes, and community reflections on Girmitiya identity, social programs, and practical ideas from the field."
      />

      <section className="bg-cream py-20">
        <div className="container-pad">

          {/* Search + filter */}
          <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_auto]">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-earth/45" size={18} />
              <input
                className="w-full rounded-full border border-primary/15 bg-white py-3.5 pl-11 pr-5 text-ink placeholder:text-earth/45 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                placeholder="Search articles…"
              />
            </label>
            <div className="no-scrollbar flex gap-2 overflow-auto">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`rounded-full px-5 py-3 text-sm font-bold whitespace-nowrap transition ${
                    index === 0
                      ? 'bg-primary text-cream'
                      : 'border border-primary/15 bg-white text-earth hover:bg-primary/8 hover:text-primary'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured article */}
          <article className="mb-10 grid overflow-hidden rounded-[2rem] bg-primary text-light shadow-premium lg:grid-cols-2">
            <img src={blogs[0].image} alt={blogs[0].title} className="h-full min-h-80 w-full object-cover" />
            <div className="p-8 sm:p-10">
              <span className="font-display text-base tracking-[0.2em] text-saffron">FEATURED ARTICLE</span>
              <Reveal as="h2" className="mt-4 font-display text-4xl text-balance">
                {blogs[0].title}
              </Reveal>
              <p className="mt-4 leading-8 text-light/76">{blogs[0].excerpt}</p>
              <Button to="/blog" variant="secondary" className="mt-7">Read Article</Button>
            </div>
          </article>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((post) => <BlogCard key={post.title} post={post} />)}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex justify-center gap-2">
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`grid h-11 w-11 place-items-center rounded-full font-bold transition ${
                  page === 1
                    ? 'bg-primary text-cream'
                    : 'border border-primary/15 bg-white text-earth hover:bg-primary/8 hover:text-primary'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
